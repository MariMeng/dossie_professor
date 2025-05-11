const xhttp = new XMLHttpRequest();
var nome_pessoa = document.getElementById("nome")
var resumo_div = document.getElementById("sobre")
var img_icon = document.getElementById("img_icon");
var resumo_cv = document.getElementById("nome_instituto")
var evento_div = document.getElementById("eventos");
var formacao_academica = document.getElementById("formacao_academica")
let formacoes_tipo = ["ENSINO-MEDIO-SEGUNDO-GRAU", "GRADUACAO", "MESTRADO", "DOUTORADO"];
var divisoria = "<h2> /<h2>"
var trabalhos = document.getElementById("trabalho_div")
var complementares_div = document.getElementById("formacoes_complementares_div")
var linha_pesquisa = document.getElementById("linha_pesquisa_div")
var pesquisa = document.getElementById("projeto_pesquisa_div")
var extensao = document.getElementById("projeto_extensao_div")
var proj_desenvolvimento = document.getElementById("projeto_desenvolvimento_div")
var trabalho_tecnico = document.getElementById("trabalhos_tecnicos_div")
var premios_titulo = document.getElementById("premios_div")
var idiomas_div = document.getElementById("idiomas_div")



xhttp.onload = function(){
    if(this.readyState == 4 && this.status ==200){
    let dados = this.responseXML;
    let dados_gerais = dados.getElementsByTagName("DADOS-GERAIS");
    let dados_complementares = dados.getElementsByTagName("DADOS-COMPLEMENTARES")
    let endereco = dados.getElementsByTagName("ENDERECO")
    let formacao_complementar = dados.getElementsByTagName("ENDERECO")//loop
    let eventos_seminario = dados.getElementsByTagName("PARTICIPACAO-EM-SEMINARIO") //loop
    let info_adicional_instituto = dados.getElementsByTagName("ENDERECO") 
    let info_adicional_cursos = dados.getElementsByTagName("ENDERECO")
    var novo_p = document.createElement('p')
    var complementar = dados.getElementsByTagName("FORMACAO-COMPLEMENTAR-CURSO-DE-CURTA-DURACAO")
    //var graduacao = dados.getElementsByTagName("GRADUACAO")
   var linhas = dados.getElementsByTagName("LINHA")
   let trabalho = dados.getElementsByTagName("TRABALHO");
   let proj_pesquisa = dados.getElementsByTagName("PROJETOS-DE-PESQUISA")[0].getElementsByTagName("PROJETO")
    //nome.innerHTML =  dados_gerais[0].getAttribute("NOME-COMPLETO") //consigo já acessar os daods gerais
   let proj_extensao = dados.getElementsByTagName("PROJETOS-DE-EXTENSAO")[0].getElementsByTagName("PROJETO")
   let proj_desenvolvi = dados.getElementsByTagName("PROJETOS-DE-DESENVOLVIMENTO")[0].getElementsByTagName("PROJETO")
   let participacao_evento = dados.getElementsByTagName("EVENTO")
   let trabalhos_tecnicos = dados.getElementsByTagName("TRABALHO-TECNICO")
   let premios = dados.getElementsByTagName("PREMIO-TITULO")
   let idioma = dados.getElementsByTagName("IDIOMA")


   nome_pessoa.innerHTML = dados_gerais[0].getAttribute("NOME-COMPLETO");

    //COLOCNDO O RESUMO
    novo_p.innerHTML = dados_gerais[0].getElementsByTagName("RESUMO-CV")[0].getAttribute("TEXTO-RESUMO-CV-RH") 
    resumo_div.append(novo_p)

    if(dados_gerais[0].getAttribute("SEXO") == "FEMININO")
        img_icon.src="img/mulher.jpg"
    else
        img_icon.src="img/homem.jpg"

    //INSTITUICOES GRADUCAO, MESTRADO, DOUTORADO
 

    for(let formacoes of formacoes_tipo){
        console.log("entrou")
        if(formacoes !== null){
        var tipo_formacao = document.createElement('h3')
        var titulo_instituo = document.createElement('p')
        var status = document.createElement('p')
        var ano_inicio = document.createElement('p')
        var graduacao = dados.getElementsByTagName(formacoes)
        var nome_curso = document.createElement('p')
    
        tipo_formacao.innerHTML = formacoes + "<hr>"
        formacao_academica.appendChild(tipo_formacao)
        titulo_instituo.innerHTML = "Nome da Instituicao:"+ graduacao[0].getAttribute("NOME-INSTITUICAO")
        formacao_academica.appendChild(titulo_instituo)
        nome_curso.innerHTML = "Nome do curso" + graduacao[0].getAttribute("NOME-CURSO")
        if(graduacao[0].getAttribute("NOME-CURSO"))formacao_academica.appendChild(nome_curso)
        ano_inicio.innerHTML = "Ano de inicio:"+ graduacao[0].getAttribute("ANO-DE-INICIO") + ":" +  graduacao[0].getAttribute("ANO-DE-CONCLUSAO")
        formacao_academica.appendChild(ano_inicio)
        status.innerHTML = "Status: "+ graduacao[0].getAttribute("STATUS-DO-CURSO")
        formacao_academica.appendChild(status)
        }else{
            console.log("nao tem" +formacoes)
        }
    }

      for(let i = 0;i<idioma.length;i++){
       var nome = document.createElement('h3')
       var leitura = document.createElement('p')
       var fala = document.createElement('p')
       var escrita = document.createElement('p')
       var compreensao = document.createElement('p')

       nome.innerHTML = idioma[i].getAttribute("NOME-IDIOMA");
       leitura.innerHTML = idioma[i].getAttribute("LEITURA");
       fala.innerHTML = idioma[i].getAttribute("FALA");
       escrita.innerHTML = idioma[i].getAttribute("ESCRITA");
       compreensao.innerHTML = idioma[i].getAttribute("COMPREENSAO");

       idiomas_div.append(nome, leitura, fala, escrita, compreensao)
       
    }


    //eventos_seminario
    for(let i = 0;i<eventos_seminario.length;i++){
        var novo_paragrafo = document.createElement('p')
        console.log("entroou")
        novo_paragrafo.innerHTML = "titulo: "+  eventos_seminario[i].getElementsByTagName("DADOS-BASICOS-DA-PARTICIPACAO-EM-SEMINARIO")[0].getAttribute("TITULO")
        evento_div.appendChild(novo_paragrafo)
    }
    
    //anais COMPLETO
    for(let i = 0;i<trabalho.length;i++){
       var titulo = document.createElement('h3')
       var evento = document.createElement('p')
       var autores = document.createElement('p')
       var publicacao = document.createElement('p')
       var paginas = document.createElement('p')
       var editora = document.createElement('p')

       titulo.innerHTML = trabalho[i].getAttribute("TITULO");
       evento.innerHTML = trabalho[i].getAttribute("EVENTO");
       autores.innerHTML = trabalho[i].getAttribute("LOCAL");
       publicacao.innerHTML = trabalho[i].getAttribute("PUBLICACAO");
       paginas.innerHTML = trabalho[i].getAttribute("PAGINAS");
       editora.innerHTML = trabalho[i].getAttribute("EDITORA");
       trabalhos.append(titulo,evento,autores,publicacao,paginas,editora)
       
    }

    //formacao complementar
    for(let i = 0;i<trabalho.length;i++){
       var instituicao = document.createElement('p')
       var nome_curso = document.createElement('h3')
       var status = document.createElement('p')
       var ano = document.createElement('p')

       instituicao.innerHTML = complementar[i].getAttribute("NOME-INSTITUICAO")
       nome_curso.innerHTML = complementar[i].getAttribute("NOME-CURSO")
       status.innerHTML = complementar[i].getAttribute("STATUS-DO-CURSO") 
       ano.innerHTML = complementar[i].getAttribute("ANO-DE-INICIO") + " - " + complementar[i].getAttribute("ANO-DE-CONCLUSAO")

       complementares_div.append(nome_curso,instituicao,ano,status)       
   
    }
    //linhas de pesquisa
      for(let i = 0;i<linhas.length;i++){
       var nome = document.createElement('p')
       var objetivo = document.createElement('p')

       nome.innerHTML = linhas[i].getAttribute("NOME")
       objetivo.innerHTML = linhas[i].getAttribute("OBJETIVO")

       linha_pesquisa.append(nome, objetivo)       
   
    }

    //projeto de pesquisa
    for(let i = 0;i<proj_pesquisa.length;i++){
       var nome = document.createElement('h3')
       var ano = document.createElement('p')
       var descricao = document.createElement('p')
       var natureza = document.createElement('p')
       var div_sobre = document.createElement('div')
       var div_descricao =  document.createElement('div')
       var div_nova = document.createElement('div')

       nome.innerHTML = proj_pesquisa[i].getAttribute("NOME")
       ano.innerHTML = proj_pesquisa[i].getAttribute("ANO-INICIO") + " - " + proj_pesquisa[i].getAttribute("ANO-FIM")
       natureza.innerHTML = proj_pesquisa[i].getAttribute("NATUREZA")
       descricao.innerHTML = proj_pesquisa[i].getAttribute("DESCRICAO")

       div_sobre.append(nome, ano, natureza)
       div_descricao.append(descricao)
       div_nova.append(div_sobre, div_descricao);
       pesquisa.append(div_nova)

    }
   //projeto de extensao
    for(let i = 0;i<proj_extensao.length;i++){
       var nome = document.createElement('h3')
       var ano = document.createElement('p')
       var descricao = document.createElement('p')
       var natureza = document.createElement('p')
       var div_sobre = document.createElement('div')
       var div_descricao =  document.createElement('div')
       var div_nova = document.createElement('div')

       nome.innerHTML = proj_extensao[i].getAttribute("NOME")
       ano.innerHTML = proj_extensao[i].getAttribute("ANO-INICIO") + " - " + proj_extensao[i].getAttribute("ANO-FIM")
       natureza.innerHTML = proj_extensao[i].getAttribute("NATUREZA")
       descricao.innerHTML = proj_extensao[i].getAttribute("DESCRICAO")

       div_sobre.append(nome, ano, natureza)
       div_descricao.append(descricao)
       div_nova.append(div_sobre, div_descricao);
       extensao.append(div_nova)

    }
    //projeto de desenvolvimento
    for(let i = 0;i<proj_desenvolvi.length;i++){
       var nome = document.createElement('h3')
       var ano = document.createElement('p')
       var descricao = document.createElement('p')
       var natureza = document.createElement('p')
       var div_sobre = document.createElement('div')
       var div_descricao =  document.createElement('div')
       var div_nova = document.createElement('div')

       nome.innerHTML = proj_desenvolvi[i].getAttribute("NOME")
       ano.innerHTML = proj_desenvolvi[i].getAttribute("ANO-INICIO") + " - " + proj_extensao[i].getAttribute("ANO-FIM")
       natureza.innerHTML = proj_desenvolvi[i].getAttribute("NATUREZA")
       descricao.innerHTML = proj_desenvolvi[i].getAttribute("DESCRICAO")

       div_sobre.append(nome, ano, natureza)
       div_descricao.append(descricao)
       div_nova.append(div_sobre, div_descricao);
       proj_desenvolvimento.append(div_nova)

    }
    //Participacao em eventos
    for(let i = 0;i<participacao_evento.length;i++){
       var nome = document.createElement('h3')
       var ano = document.createElement('p')
       var descricao = document.createElement('p')
       var tipo = document.createElement('p')
       var div_sobre = document.createElement('div')
       var div_nova = document.createElement('div')

       nome.innerHTML = dados.getElementsByTagName("DADOS-BASICOS-DO-EVENTO")[i].getAttribute("NOME-DO-EVENTO")
       ano.innerHTML = dados.getElementsByTagName("DADOS-BASICOS-DO-EVENTO")[i].getAttribute("ANO-DO-EVENTO") 
       tipo.innerHTML = dados.getElementsByTagName("DADOS-BASICOS-DO-EVENTO")[i].getAttribute("TIPO-DE-EVENTO")
       descricao.innerHTML = dados.getElementsByTagName("DETALHAMENTO-DO-EVENTO")[i].getAttribute("DESCRICAO")

       div_sobre.append(nome, ano, tipo, descricao)
       div_nova.append(div_sobre);
       evento_div.append(div_nova)

    }

       //TRABALHOS TECNICOS
    for(let i = 0;i<trabalhos_tecnicos.length;i++){
       var titulo = document.createElement('h3')
       var ano = document.createElement('p')
       var natureza = document.createElement('p')
       var div_nova = document.createElement('div')

       titulo.innerHTML = trabalhos_tecnicos[i].getAttribute("TITULO")
       ano.innerHTML = trabalhos_tecnicos[i].getAttribute("ANO")  
       natureza.innerHTML = trabalhos_tecnicos[i].getAttribute("NATUREZA")

       div_nova.append(titulo, ano, natureza);
       trabalho_tecnico.append(div_nova)
    }

//PREMIOS E TITULOS
    for(let i = 0;i<premios.length;i++){
       var titulo = document.createElement('h3')
       var ano = document.createElement('p')
       var instituicao = document.createElement('p')
       var descricao = document.createElement('p')
       var div_nova = document.createElement('div')

       titulo.innerHTML = premios[i].getAttribute("NOME-DO-PREMIO")
       ano.innerHTML = premios[i].getAttribute("ANO-DO-PREMIO")
       instituicao.innerHTML = premios[i].getAttribute("INSTITUICAO-DO-PREMIO")
       descricao.innerHTML = premios[i].getAttribute("DESCRICAO-DO-PREMIO")

       div_nova.append(titulo,ano, instituicao, descricao);
       premios_titulo.append(div_nova)
    }

} else console.log("nao entrou")
}


xhttp.open("GET", "carolina_lattes.xml", true)

xhttp.send();

