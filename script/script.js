const xhttp = new XMLHttpRequest();

var nome_pessoa = document.getElementById("nome")
var resumo_div = document.getElementById("sobre")
var img_icon = document.getElementById("img_icon");
var evento_div = document.getElementById("eventos");
var formacao_academica = document.getElementById("formacao_academica")
let formacoes_tipo = ["GRADUACAO", "MESTRADO", "DOUTORADO"];
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
    if (!dados) {
    console.error("Erro ao carregar XML");
    return;
   }

    let dados_gerais = dados.getElementsByTagName("DADOS-GERAIS");
    var complementar = dados.getElementsByTagName("FORMACAO-COMPLEMENTAR-CURSO-DE-CURTA-DURACAO")
    var linhas = dados.getElementsByTagName("LINHA")
    let trabalho = dados.getElementsByTagName("TRABALHO");
    let proj_pesquisa = dados.getElementsByTagName("PROJETOS-DE-PESQUISA")[0].getElementsByTagName("PROJETO")
    let proj_extensao = dados.getElementsByTagName("PROJETOS-DE-EXTENSAO")[0].getElementsByTagName("PROJETO")
    let proj_desenvolvi = dados.getElementsByTagName("PROJETOS-DE-DESENVOLVIMENTO")[0].getElementsByTagName("PROJETO")
    let participacao_evento = dados.getElementsByTagName("EVENTO")
    let trabalhos_tecnicos = dados.getElementsByTagName("TRABALHO-TECNICO")
    let premios = dados.getElementsByTagName("PREMIO-TITULO")
    let idioma = dados.getElementsByTagName("IDIOMA")

    //adicionando o nome do xml
    nome_pessoa.innerHTML = dados_gerais[0].getAttribute("NOME-COMPLETO");

    //COLOCANDO O RESUMO
    var novo_p = document.createElement('p')
    novo_p.innerHTML = dados_gerais[0].getElementsByTagName("RESUMO-CV")[0].getAttribute("TEXTO-RESUMO-CV-RH") 
    resumo_div.append(novo_p)

    if(dados_gerais[0].getAttribute("SEXO") == "FEMININO")
        img_icon.src="img/mulher4.png"
    else
        img_icon.src="img/homem2.png"

    //INSTITUICOES GRADUCAO, MESTRADO, DOUTORADO
 //let formacoes_tipo = ["GRADUACAO", "MESTRADO", "DOUTORADO"];
  for (let i = 0; i < formacoes_tipo.length; i++) {
    var formacao_nome = formacoes_tipo[i];
    var formacoes = dados.getElementsByTagName(formacao_nome);

    if (formacoes !== null && formacoes.length > 0) {
        for (let j = 0; j < formacoes.length; j++) {
            var tipo_formacao = document.createElement('h3');
            var titulo_instituo = document.createElement('p');
            var status = document.createElement('p');
            var ano_inicio = document.createElement('p');
            var nome_curso = document.createElement('p');

            tipo_formacao.innerHTML = formacao_nome + "<hr>";
            titulo_instituo.innerHTML = "Nome da Instituição: " + formacoes[j].getAttribute("NOME-INSTITUICAO");
            nome_curso.innerHTML = "Nome do curso: " + formacoes[j].getAttribute("NOME-CURSO");
            ano_inicio.innerHTML = "Período: " + formacoes[j].getAttribute("ANO-DE-INICIO") + " - " + formacoes[j].getAttribute("ANO-DE-CONCLUSAO");
            status.innerHTML = "Status: " + formacoes[j].getAttribute("STATUS-DO-CURSO");
            formacao_academica.append(tipo_formacao, titulo_instituo, nome_curso, ano_inicio, status);
        }
   }
}

//adicionando os idiomas 

      for(let i = 0;i<idioma.length;i++){
       var nome = document.createElement('h3')
       var leitura = document.createElement('p')
       var fala = document.createElement('p')
       var escrita = document.createElement('p')
       var compreensao = document.createElement('p')

       nome.innerHTML = idioma[i].getAttribute("NOME-IDIOMA");
       leitura.innerHTML = "Nível de Leitura: "+ idioma[i].getAttribute("LEITURA");
       fala.innerHTML = "Nível de Fala: "+ idioma[i].getAttribute("FALA");
       escrita.innerHTML = "Nível de Escrita: "+ idioma[i].getAttribute("ESCRITA");
       compreensao.innerHTML = "Nível de Compreensão: "+ idioma[i].getAttribute("COMPREENSAO");

       idiomas_div.append(nome, leitura, fala, escrita, compreensao)
       
    }

    
    //anais congresso
    for(let i = 0;i<trabalho.length;i++){
       var titulo = document.createElement('h3')
       var evento = document.createElement('p')
       var autores = document.createElement('p')
       var publicacao = document.createElement('p')
       var paginas = document.createElement('p')
       var editora = document.createElement('p')
       var quebra_linha = document.createElement('p')

       quebra_linha.innerHTML="<hr><br>"
       titulo.innerHTML = trabalho[i].getAttribute("TITULO");
       evento.innerHTML = "Tipo de evento"+trabalho[i].getAttribute("EVENTO");
       autores.innerHTML = "Local do Evento: "+trabalho[i].getAttribute("LOCAL");
       publicacao.innerHTML = "Publicação: "+trabalho[i].getAttribute("PUBLICACAO");
       paginas.innerHTML = "Número de páginas: "+trabalho[i].getAttribute("PAGINAS");
       if(trabalho[i].getAttribute("EDITORA"))
       editora.innerHTML = "Publicado na Editora: "+trabalho[i].getAttribute("EDITORA");
       trabalhos.append(titulo,evento,autores,publicacao,paginas,editora,quebra_linha)
    }

    //formacao complementar
    for(let i = 0;i<complementar.length;i++){
       var instituicao = document.createElement('p')
       var nome_curso = document.createElement('h3')
       var status = document.createElement('p')
       var ano = document.createElement('p')
       var quebra_linha = document.createElement('p')

       instituicao.innerHTML = "Instituição: "+complementar[i].getAttribute("NOME-INSTITUICAO")
       nome_curso.innerHTML = complementar[i].getAttribute("NOME-CURSO")
       status.innerHTML = "Status: "+complementar[i].getAttribute("STATUS-DO-CURSO") 
       ano.innerHTML = "Período: "+complementar[i].getAttribute("ANO-DE-INICIO") + " - " + complementar[i].getAttribute("ANO-DE-CONCLUSAO")
       quebra_linha.innerHTML="<hr><br>"
       complementares_div.append(nome_curso,instituicao,ano,status, quebra_linha)       
   
    }

    //linhas de pesquisa
      for(let i = 0;i<linhas.length;i++){
       var nome = document.createElement('h3')
       var objetivo = document.createElement('p')
       var quebra_linha = document.createElement('p')
       quebra_linha.innerHTML="<hr><br>"

       nome.innerHTML = linhas[i].getAttribute("NOME")
       if(linhas[i].getAttribute("OBJETIVO"))
       objetivo.innerHTML = "Objetivo: "+linhas[i].getAttribute("OBJETIVO")

       linha_pesquisa.append(nome, objetivo,quebra_linha)       
   
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

       div_nova.classList.add('div_nova');
       div_descricao.classList.add('div_descricao')

       nome.innerHTML = proj_pesquisa[i].getAttribute("NOME")
       ano.innerHTML = "Período: "+proj_pesquisa[i].getAttribute("ANO-INICIO") + " - " + proj_pesquisa[i].getAttribute("ANO-FIM")
       natureza.innerHTML = "Natureza do projeto: "+proj_pesquisa[i].getAttribute("NATUREZA")
       descricao.innerHTML = "Descrição: "+proj_pesquisa[i].getAttribute("DESCRICAO")

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
      div_nova.classList.add('div_nova');
      div_descricao.classList.add('div_descricao')

      if(proj_extensao[i].getAttribute("NOME"))
      nome.innerHTML = proj_extensao[i].getAttribute("NOME")
      if(proj_extensao[i].getAttribute("ANO-INICIO") || proj_extensao[i].getAttribute("ANO-FIM"))
      ano.innerHTML = "Período: " + proj_extensao[i].getAttribute("ANO-INICIO") + " - " + proj_extensao[i].getAttribute("ANO-FIM")
      if(proj_extensao[i].getAttribute("NATUREZA"))
      natureza.innerHTML = "Natureza do projeto: " + proj_extensao[i].getAttribute("NATUREZA")
      if(proj_extensao[i].getAttribute("DESCRICAO"))
      descricao.innerHTML = "Descrição: " + proj_extensao[i].getAttribute("DESCRICAO")

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
      div_nova.classList.add('div_nova');
      div_descricao.classList.add('div_descricao')

      if(proj_desenvolvi[i].getAttribute("NOME"))
      nome.innerHTML = proj_desenvolvi[i].getAttribute("NOME")
      if(proj_desenvolvi[i].getAttribute("ANO-INICIO") || proj_desenvolvi[i].getAttribute("ANO-FIM"))
      ano.innerHTML = "Período: " + proj_desenvolvi[i].getAttribute("ANO-INICIO") + " - " + proj_desenvolvi[i].getAttribute("ANO-FIM")
      if(proj_desenvolvi[i].getAttribute("NATUREZA"))
      natureza.innerHTML = "Natureza do projeto: " + proj_desenvolvi[i].getAttribute("NATUREZA")
      if(proj_desenvolvi[i].getAttribute("DESCRICAO"))
      descricao.innerHTML = "Descrição: " + proj_desenvolvi[i].getAttribute("DESCRICAO")

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
      var quebra_linha = document.createElement('p')

      div_nova.classList.add('div_nova');

      var dados_basicos = dados.getElementsByTagName("DADOS-BASICOS-DO-EVENTO")[i];
      var detalhamento = dados.getElementsByTagName("DETALHAMENTO-DO-EVENTO")[i];

      if(dados_basicos?.getAttribute("NOME-DO-EVENTO"))
      nome.innerHTML = dados_basicos.getAttribute("NOME-DO-EVENTO")
      if(dados_basicos?.getAttribute("ANO-DO-EVENTO"))
      ano.innerHTML = "Ano do Evento: " + dados_basicos.getAttribute("ANO-DO-EVENTO")
      if(dados_basicos?.getAttribute("TIPO-DE-EVENTO"))
      tipo.innerHTML = "Tipo de evento: " + dados_basicos.getAttribute("TIPO-DE-EVENTO")
      if(detalhamento?.getAttribute("DESCRICAO"))
      descricao.innerHTML = "Descrição do evento: " + detalhamento.getAttribute("DESCRICAO")

      quebra_linha.innerHTML = "<hr>"
      div_sobre.append(nome, ano, tipo, descricao, quebra_linha)
      div_nova.append(div_sobre);
      evento_div.append(div_nova)
   }

   //TRABALHOS TECNICOS
   for(let i = 0;i<trabalhos_tecnicos.length;i++){
      var titulo = document.createElement('h3')
      var ano = document.createElement('p')
      var natureza = document.createElement('p')
      var div_nova = document.createElement('div')
      var quebra_linha = document.createElement('p')

      if(trabalhos_tecnicos[i].getAttribute("TITULO"))
      titulo.innerHTML = trabalhos_tecnicos[i].getAttribute("TITULO")
      if(trabalhos_tecnicos[i].getAttribute("ANO"))
      ano.innerHTML = "Ano do Trabalho: " + trabalhos_tecnicos[i].getAttribute("ANO")
      if(trabalhos_tecnicos[i].getAttribute("NATUREZA"))
      natureza.innerHTML = "Natureza: " + trabalhos_tecnicos[i].getAttribute("NATUREZA")
      quebra_linha.innerHTML = "<hr>"

      div_nova.append(titulo, ano, natureza, quebra_linha);
      trabalho_tecnico.append(div_nova)
   }

   //PREMIOS E TITULOS
   for(let i = 0;i<premios.length;i++){
      var titulo = document.createElement('h3')
      var ano = document.createElement('p')
      var instituicao = document.createElement('p')
      var descricao = document.createElement('p')
      var div_nova = document.createElement('div')
      var quebra_linha = document.createElement('p')

      if(premios[i].getAttribute("NOME-DO-PREMIO"))
      titulo.innerHTML = premios[i].getAttribute("NOME-DO-PREMIO")
      if(premios[i].getAttribute("ANO-DO-PREMIO"))
      ano.innerHTML = "Ano do Prêmio: " + premios[i].getAttribute("ANO-DO-PREMIO")
      if(premios[i].getAttribute("INSTITUICAO-PROMOTORA"))
      instituicao.innerHTML = "Instituição do Prêmio: " + premios[i].getAttribute("INSTITUICAO-PROMOTORA")
      if(premios[i].getAttribute("DESCRICAO-DO-PREMIO"))
      descricao.innerHTML = "Descrição do Prêmio: " + premios[i].getAttribute("DESCRICAO-DO-PREMIO")

      quebra_linha.innerHTML = "<hr>"
      div_nova.append(titulo, ano, instituicao, descricao, quebra_linha);
      premios_titulo.append(div_nova)
   }

} else console.log("Erro")
}

xhttp.open("GET", "doc_lattes/carolina_lattes.xml", true)

xhttp.send();

