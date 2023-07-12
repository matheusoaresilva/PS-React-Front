import React from 'react';

function TableTransacoes({ transacoes, formatarData, getTipoTransferencia }) {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Dados</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Nome do Operador Transacionado</th>
        </tr>
      </thead>
      <tbody>
        {transacoes.map((transacao) => (
          <tr key={transacao.id}>
            <td>{formatarData(transacao.dataTransferencia)}</td>
            <td style={{ color: transacao.valor < 0 ? 'red' : 'inherit' }}>
              {transacao.valor.toFixed(2)}
            </td>
            <td>{getTipoTransferencia(transacao.valor)}</td>
            <td>{transacao.nomeOperadorTransacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableTransacoes;
