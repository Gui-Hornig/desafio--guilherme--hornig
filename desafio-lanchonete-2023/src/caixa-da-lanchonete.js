
class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        const descontoDinheiro = 0.05;
        const acrescimoCredito = 0.03;

        let valorTotal = 0;
        let cafePedido = false;
        let sanduichePedido = false;

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            const valorItem = cardapio[codigo];

            if (valorItem === undefined) {
                return "Item inválido!";
            }

            if ((codigo === 'chantily' || codigo === 'queijo') && !(cafePedido || sanduichePedido)) {
                return "Item extra não pode ser pedido sem o principal";
            } else if (codigo === 'cafe') {
                cafePedido = true;
            } else if (codigo === 'sanduiche') {
                sanduichePedido = true;
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            valorTotal += valorItem * quantidade;
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal -= valorTotal * descontoDinheiro;
        } else if (formaDePagamento === 'credito') {
            valorTotal += valorTotal * acrescimoCredito;
        } else if (formaDePagamento !== 'debito') {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();
const formaDePagamento = 'dinheiro';
const itens = ['cafe,1', 'sanduiche,1', 'queijo,1'];

const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);
console.log(resultado);