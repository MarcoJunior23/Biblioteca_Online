const express = require('express');
const Product = require('../models/ativo');
const router = express.Router();
const mongoose = require('mongoose');

// Middleware para analisar o corpo da requisição
router.use(express.json());

mongoose.connect('mongodb+srv://techapoiosenai:12345@cluster0.3dcip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Mongodb conectado')).catch(err => console.error('Erro ao conectar no mongo', err));

// Rota para cadastrar um novo produto (POST)
router.post('/', async (req, res) => {
    const { nome, quantidade, tipo, lote , id_ativo} = req.body;

    try {
        const newProduct = new Product({ nome, quantidade, tipo, lote, id_ativo });
        await newProduct.save();

        res.status(201).json(newProduct); // 201 - Produto criado
    } catch (error) {
        console.error('Erro ao cadastrar ativo:', error);
        res.status(500).json({ message: 'Erro ao cadastrar ativo', error });
    }
});

// Rota para buscar todos os produtos (GET)
router.get('/produtos/:id_ativo', async (req, res) => {
    try {
        // Extrair o id_ativo da URL
        const { id_ativo } = req.params;

        // Buscar produto pelo id_ativo
        const produto = await Product.findOne({ id_ativo: id_ativo });

        // Se o produto não for encontrado
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Adicionando ênfase aos itens, destacando nome e quantidade
        const produtoComEnfase = {
            nome: `**${produto.nome}**`, // Nome em negrito
            quantidade: `**${produto.quantidade}**`, // Quantidade em negrito
            tipo: produto.tipo,
            lote: produto.lote,
            id_ativo: produto.id_ativo,
        };

        // Enviar o produto com ênfase como resposta
        res.json(produtoComEnfase);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
});

router.get('/produtos', async (req, res) => {
    try {
        const produtos = await Product.find(); // Retorna todos os produtos
        
        // Adicionando ênfase aos itens, destacando nome e quantidade
        const produtosComEnfase = produtos.map(produto => ({
            nome: `**${produto.nome}**`, // Nome em negrito (ou outro tipo de ênfase)
            quantidade: `**${produto.quantidade}**`, // Quantidade em negrito
            tipo: produto.tipo,
            lote: produto.lote,
            id_ativo: produto.id_ativo,
            // Você pode adicionar outros campos aqui com ênfase se necessário
        }));

        res.json(produtosComEnfase);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        res.status(500).json({ message: 'Erro ao gerar relatório' });
    }
});
// Rota para atualizar um produto (PUT)
// router.put('/:id_ativo', async (req, res) => {
//     const { nome, quantidade, tipo, lote } = req.body;

//     // Verificar se o id_ativo foi passado no corpo da requisição
//     // if (!id_ativo) {
//     //     return res.status(400).json({ message: 'ID do ativo é necessário.' });
//     // }

//     // Verificar se os campos obrigatórios estão presentes
//     // if (!nome || quantidade === undefined || tipo === undefined || !lote) {
        
        
//     //     return res.status(400).json({ message: 'Campos nome, quantidade, tipo e lote são obrigatórios.' });
//     // }

//     // Limpar caracteres indesejados (como **) e garantir que 'quantidade' seja um número
//     // const quantidadeNumber = Number(quantidade.replace(/[^\d.-]/g, '')); // Remove caracteres não numéricos

//     // Verificar se a conversão foi bem-sucedida
//     // if (isNaN(quantidadeNumber)) {
//     //     return res.status(400).json({ message: 'Quantidade deve ser um número válido.' });
//     // }

//     try {
//         // Buscar o produto pelo id_ativo
//         const updatedProduct = await Product.findOneAndUpdate(
//             // { id_ativo: id_ativo }, // Busca pelo id_ativo
//             {nome:nome, quantidade:quantidade, tipo:tipo, lote:lote}
//             // { nome, quantidade: quantidadeNumber, tipo, lote }, // Atualiza os dados
//             // { new: true } // Retorna o produto atualizado
//         );

//         // Se não encontrar o produto, retorna erro 404
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Produto com id_ativo informado não encontrado.' });
//         }

//         // Retorna o produto atualizado
//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         console.error('Erro ao atualizar ativo:', error);
//         res.status(500).json({ message: 'Erro ao atualizar ativo', error });
//     }
// });

router.put('/:id_ativo', async (req, res) => {
    const { nome, quantidade, tipo, lote } = req.body;
    const { id_ativo } = req.params; // Pegando o ID do ativo diretamente da URL

    // Verificar se todos os campos obrigatórios foram enviados
    if (!nome || quantidade === undefined || tipo === undefined || lote === undefined) {
        return res.status(400).json({ message: 'Campos nome, quantidade, tipo e lote são obrigatórios.' });
    }

    // Garantir que 'quantidade' seja um número
    const quantidadeNumber = Number(quantidade);
    if (isNaN(quantidadeNumber)) {
        return res.status(400).json({ message: 'Quantidade deve ser um número válido.' });
    }

    try {
        // Atualizar o produto com base no id_ativo
        const updatedProduct = await Product.findOneAndUpdate(
            { id_ativo: id_ativo }, // Filtro para encontrar o produto pelo id_ativo
            { nome, quantidade: quantidadeNumber, tipo, lote }, // Campos a serem atualizados
            { new: true } // Retorna o produto atualizado
        );

        // Se não encontrar o produto, retorna erro 404
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto com id_ativo informado não encontrado.' });
        }

        // Retorna o produto atualizado
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar ativo:', error);
        res.status(500).json({ message: 'Erro ao atualizar ativo', error });
    }
});




// Rota para deletar um produto com base no lote e quantidade (DELETE)
router.delete('/:id_ativo', async (req, res) => {
    const { id_ativo } = req.params; // Pega o id_ativo da URL

    if (!id_ativo) {
        return res.status(400).json({ message: 'id_ativo é necessário.' });
    }

    try {
        const deletedProducts = await Product.deleteMany({
            id_ativo: id_ativo  // Remover todos os produtos com esse id_ativo
        });

        if (deletedProducts.deletedCount === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado com esse id_ativo.' });
        }

        res.status(200).json({ message: `${deletedProducts.deletedCount} produto(s) deletado(s) com sucesso` });
    } catch (error) {
        console.error('Erro ao deletar ativo:', error);
        res.status(500).json({ message: 'Erro ao deletar ativo', error });
    }
});


module.exports = router;
