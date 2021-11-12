function Pagina(){

    defineCustomizacao({
        "desabilitarEdicao" : true,
        "colunasMobile" : ['nome', 'descricao']
    })
    defineRotas({
        base : "rota-dados",
        incluir : "@base/incluir",
        deletar : "@base/deletar/{IDRegistro}"
    })
    defineAPI(ObjetoAPI)

    return (
        <Tabela>
            <Coluna/>
            <Linha/>
        </Tabela>
    )
}