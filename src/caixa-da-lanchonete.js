class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00, isExtra: false },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50, isExtra: true, mainItem: 'cafe' },
            suco: { descricao: 'Suco Natural', valor: 6.20, isExtra: false },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50, isExtra: false },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00, isExtra: true, mainItem: 'sanduiche' },
            salgado: { descricao: 'Salgado', valor: 7.25, isExtra: false },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50, isExtra: false },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50, isExtra: false }
        };

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;
        const codigos = itens.map(x => x.split(',')[0])

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (codigo in this.cardapio) {
                if (quantidade <= 0) {
                    return 'Quantidade inválida!';
                }
                let itemCardapio = this.cardapio[codigo]

                total += itemCardapio.valor * parseInt(quantidade);

                if (itemCardapio.isExtra && !codigos.includes(itemCardapio.mainItem)) {
                    return 'Item extra não pode ser pedido sem o principal';
                }

            } else {
                return 'Item inválido!';
            }
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // 5% de desconto
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // 3% de acréscimo
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };