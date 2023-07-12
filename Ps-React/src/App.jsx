import React, { useState, useEffect } from 'react';
import api from './Api';
import InputDataInicio from './Components/Inputs/InputDataInicio';
import InputDataFim from './Components/Inputs/InputDataFim';
import ButtonPesquisar from './Components/Button/ButtonPesquisar';
import TableTransacoes from './Components/Inputs/TabelaTransacoes';
import Pagination from './Components//Pagination/Pagination';

function TelaPesquisa() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperador, setNomeOperador] = useState('');
  const [transacoes, setTransacoes] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState('');
  const [saldoPeriodo, setSaldoPeriodo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const handlePesquisar = async () => {
    try {
      let url = '/transferencias';

      if (dataInicio || dataFim || nomeOperador) {
        url += `/?dataInicio=${dataInicio}&dataFim=${dataFim}&nomeOperadorTransacao=${nomeOperador}`;
      }

      const response = await api.get(url);
      setTransacoes(response.data);

      // Calcular saldo total
      const saldoTotalCalculado = response.data.reduce(
        (acumulador, transacao) => acumulador + transacao.valor,
        0
      );
      setSaldoTotal(saldoTotalCalculado.toFixed(2));

      // Filtrar transações no período
      const transacoesPeriodo = response.data.filter(
        (transacao) =>
          new Date(transacao.dataTransferencia) >= new Date(dataInicio) &&
          new Date(transacao.dataTransferencia) <= new Date(dataFim)
      );

      // Calcular saldo no período considerando saques e depósitos
      const saldoPeriodoCalculado = transacoesPeriodo.reduce((saldo, transacao) => {
        if (transacao.tipo === 'SAQUE') {
          return saldo - transacao.valor;
        } else if (transacao.tipo === 'DEPOSITO') {
          return saldo + transacao.valor;
        } else {
          return saldo;
        }
      }, 0);

      setSaldoPeriodo(saldoPeriodoCalculado.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePesquisar();
  }, []);

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate();
    const mes = dataObj.getMonth() + 1;
    const ano = dataObj.getFullYear();
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
  };

  const isCamposVazios = () => {
    return !dataInicio && !dataFim && !nomeOperador;
  };

  const handlePesquisarClick = () => {
    if (isCamposVazios()) {
      handlePesquisar();
    } else {
      handlePesquisar();
    }
  };

  const getTipoTransferencia = (valor) => {
    if (valor < 0) {
      return 'TRANSFERENCIA SAÍDA';
    } else {
      return 'TRANSFERENCIA ENTRADA';
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transacoes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transacoes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-6">
          <InputDataInicio value={dataInicio} onChange={setDataInicio} />
        </div>
        <div className="col-md-6">
          <InputDataFim value={dataFim} onChange={setDataFim} />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Nome do Operador Transacionado:</label>
        <input
          type="text"
          className="form-control"
          value={nomeOperador}
          onChange={(e) => setNomeOperador(e.target.value)}
        />
      </div>
      <ButtonPesquisar onClick={handlePesquisarClick} />

      <div className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <p>Saldo Total: R$ {saldoTotal}</p>
          </div>
          <div className="col-md-6">
            <p>Saldo no período: R$ {saldoPeriodo}</p>
          </div>
        </div>
      </div>

      <TableTransacoes
        transacoes={currentItems}
        formatarData={formatarData}
        getTipoTransferencia={getTipoTransferencia}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        paginate={paginate}
      />
    </div>
  );
}

export default TelaPesquisa;
