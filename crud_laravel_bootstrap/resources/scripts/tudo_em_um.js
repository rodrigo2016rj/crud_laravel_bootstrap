import {Modal, Tooltip} from "alias_bootstrap/dist/js/bootstrap.min.js";
import "alias_bootstrap-icons/icons/pencil.svg";
import "alias_bootstrap-icons/icons/x.svg";

window.addEventListener("load", function(){
  const div_pagina_tudo_em_um = document.getElementById("div_pagina_tudo_em_um");
  
  /* Filtros, ordenação e paginação da lista de pessoas */
  const campo_filtro_nome = document.getElementById("campo_filtro_nome");
  const campo_filtro_cpf = document.getElementById("campo_filtro_cpf");
  const campo_filtro_data_de_nascimento = document.getElementById("campo_filtro_data_de_nascimento");
  const caixa_de_selecao_filtro_setor = document.getElementById("caixa_de_selecao_filtro_setor");
  const caixa_de_selecao_quantidade_por_pagina = document.getElementById("caixa_de_selecao_quantidade_por_pagina");
  
  const campo_ordenacao = document.getElementById("campo_ordenacao");
  const botao_buscar = document.getElementById("botao_buscar");
  const botao_limpar = document.getElementById("botao_limpar");
  
  const div_local_da_lista_de_pessoas = document.getElementById("div_local_da_lista_de_pessoas");
  const span_status_da_busca_animado = document.getElementById("span_status_da_busca_animado");
  const span_status_da_busca = document.getElementById("span_status_da_busca");
  
  const div_paginacao_de_cima_da_lista_de_pessoas = document.getElementById("div_paginacao_de_cima_da_lista_de_pessoas");
  const div_paginacao_de_baixo_da_lista_de_pessoas = document.getElementById("div_paginacao_de_baixo_da_lista_de_pessoas");
  let links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
  let pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
  
  const div_partes_da_lista_de_pessoas = document.getElementById("div_partes_da_lista_de_pessoas");
  const partes_da_lista = document.getElementsByClassName("parte_da_lista");
  const div_lista_de_pessoas = document.getElementById("div_lista_de_pessoas");
  
  const botao_confirmar_do_calendario = document.getElementById("botao_confirmar_do_calendario");
  
  const div_cadastrar_pessoa = document.getElementById("div_cadastrar_pessoa");
  const div_editar_pessoa = document.getElementById("div_editar_pessoa");
  
  let ordenacao = campo_ordenacao.value;
  let pagina = null;
  if(typeof pagina_selecionada != "undefined"){
    pagina = pagina_selecionada.innerText;
  }
  let contador_de_filtro = 0;
  
  campo_filtro_nome.addEventListener("input", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  campo_filtro_cpf.addEventListener("input", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  campo_filtro_data_de_nascimento.addEventListener("input", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  caixa_de_selecao_filtro_setor.addEventListener("change", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  caixa_de_selecao_quantidade_por_pagina.addEventListener("change", function(){
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  botao_confirmar_do_calendario.addEventListener("click", function(){
    if(div_cadastrar_pessoa.style.display == "block" || div_editar_pessoa.style.display == "block"){
      return;
    }
    setTimeout(function(){
      botao_buscar.click();
    }, 0);
  });
  
  /* Máscara do campo_filtro_cpf */
  let ultimo_valor_campo_filtro_cpf = "";
  
  campo_filtro_cpf.addEventListener("input", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_filtro_cpf.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_filtro_cpf = campo_filtro_cpf.value;
      return;
    }
    
    campo_filtro_cpf.value = campo_filtro_cpf.value.replace(/[^0-9]/g, "");
    
    if(campo_filtro_cpf.value.length >= 3){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 3) + "." + campo_filtro_cpf.value.slice(3);
      if((posicao_do_cursor === 3 || posicao_do_cursor === 4) && campo_filtro_cpf.value.length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }else if(campo_filtro_cpf.value.length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length >= 7){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 7) + "." + campo_filtro_cpf.value.slice(7);
      if((posicao_do_cursor === 7 || posicao_do_cursor === 8) && campo_filtro_cpf.value.length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }else if(campo_filtro_cpf.value.length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length >= 11){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 11) + "-" + campo_filtro_cpf.value.slice(11);
      if((posicao_do_cursor === 11 || posicao_do_cursor === 12) && campo_filtro_cpf.value.length > ultimo_valor_campo_filtro_cpf.length){
        posicao_do_cursor++;
      }
    }
    if(campo_filtro_cpf.value.length > 14){
      campo_filtro_cpf.value = campo_filtro_cpf.value.slice(0, 14);
    }
    
    campo_filtro_cpf.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_filtro_cpf = campo_filtro_cpf.value;
  });
  
  botao_buscar.addEventListener("click", function(){
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca_animado.classList.remove("tag_oculta");
    span_status_da_busca.innerText = "Buscando...";
    span_status_da_busca.classList.remove("tag_oculta");
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    url_mais += "?filtro_nome=" + filtro_nome;
    url_mais += "&filtro_cpf=" + filtro_cpf;
    url_mais += "&filtro_data_de_nascimento=" + filtro_data_de_nascimento;
    url_mais += "&filtro_id_do_setor=" + filtro_id_do_setor;
    url_mais += "&quantidade_por_pagina=" + quantidade_por_pagina;
    url_mais += "&ordenacao=" + ordenacao;
    let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  });
  
  botao_limpar.addEventListener("click", function(){
    campo_filtro_nome.value = "";
    campo_filtro_cpf.value = "";
    campo_filtro_data_de_nascimento.value = "";
    caixa_de_selecao_filtro_setor.value = "";
    caixa_de_selecao_quantidade_por_pagina.value = "padrao";
    
    partes_da_lista[0].querySelectorAll("span")[1].innerText = "";
    partes_da_lista[1].querySelectorAll("span")[1].innerText = "";
    partes_da_lista[2].querySelectorAll("span")[1].innerText = "";
    partes_da_lista[3].querySelectorAll("span")[1].innerText = "";
    ordenacao = null;
    
    pagina = null;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca_animado.classList.remove("tag_oculta");
    span_status_da_busca.innerText = "Buscando...";
    span_status_da_busca.classList.remove("tag_oculta");
    div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = ""; //Opcional
    div_partes_da_lista_de_pessoas.classList.add("tag_oculta"); //Opcional
    div_lista_de_pessoas.innerHTML = "Aguarde..."; //Opcional
    div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = ""; //Opcional
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            div_partes_da_lista_de_pessoas.classList.remove("tag_oculta"); //Opcional
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  });
  
  eventos_dos_links_da_paginacao();
  
  function eventos_dos_links_da_paginacao(){
    for(let i = 0; i < links_da_paginacao.length; i++){
      links_da_paginacao[i].removeEventListener("click", evento_do_link_da_paginacao);
      links_da_paginacao[i].addEventListener("click", evento_do_link_da_paginacao);
    }
  }
  
  function evento_do_link_da_paginacao(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    let href = tag_que_disparou_o_evento.getAttribute("href");
    pagina = href.replace("/tudo_em_um?pagina=", "");
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca_animado.classList.remove("tag_oculta");
    span_status_da_busca.innerText = "Mudando de página...";
    span_status_da_busca.classList.remove("tag_oculta");
    
    let posicao_vertical_desta_tag = tag_que_disparou_o_evento.getBoundingClientRect().top + window.scrollY;
    let posicao_vertical_da_div_lista_de_pessoas = div_lista_de_pessoas.getBoundingClientRect().top + window.scrollY;
    if(posicao_vertical_desta_tag > posicao_vertical_da_div_lista_de_pessoas){
      let posicao_vertical_da_div_local_da_lista_de_pessoas = div_local_da_lista_de_pessoas.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, posicao_vertical_da_div_local_da_lista_de_pessoas - 4);
    }
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "GET";
    let url_mais = "";
    url_mais += "?filtro_nome=" + filtro_nome;
    url_mais += "&filtro_cpf=" + filtro_cpf;
    url_mais += "&filtro_data_de_nascimento=" + filtro_data_de_nascimento;
    url_mais += "&filtro_id_do_setor=" + filtro_id_do_setor;
    url_mais += "&quantidade_por_pagina=" + quantidade_por_pagina;
    url_mais += "&ordenacao=" + ordenacao;
    url_mais += "&pagina=" + pagina;
    let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
    let dados_post = null;
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  for(let i = 0; i < partes_da_lista.length; i++){
    partes_da_lista[i].addEventListener("click", function(){
      const tags_span = partes_da_lista[i].querySelectorAll("span");
      const texto_um = tags_span[0].innerText;
      
      if(texto_um === "Opções" || tags_span.length < 2){
        return;
      }
      
      const texto_dois = tags_span[1].innerText;
      let texto_completo = texto_um + " " + texto_dois;
      texto_completo = texto_completo.trim();
      
      let filtro_nome = campo_filtro_nome.value;
      let filtro_cpf = campo_filtro_cpf.value;
      let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
      let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
      let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
      
      partes_da_lista[0].querySelectorAll("span")[1].innerText = "";
      partes_da_lista[1].querySelectorAll("span")[1].innerText = "";
      partes_da_lista[2].querySelectorAll("span")[1].innerText = "";
      partes_da_lista[3].querySelectorAll("span")[1].innerText = "";
      
      /* Trocando o valor após o clique */
      switch (texto_completo){
        case "Nome":
          ordenacao = "nome_completo_a_z";
          tags_span[1].innerText = "(A → Z)";
          break;
        case "Nome (A → Z)":
          ordenacao = "nome_completo_z_a";
          tags_span[1].innerText = "(Z → A)";
          break;
        case "Nome (Z → A)":
          ordenacao = "padrao";
          tags_span[1].innerText = "";
          break;
        case "CPF":
          ordenacao = "cpf_crescente";
          tags_span[1].innerText = "(0 → 9)";
          break;
        case "CPF (0 → 9)":
          ordenacao = "cpf_decrescente";
          tags_span[1].innerText = "(9 → 0)";
          break;
        case "CPF (9 → 0)":
          ordenacao = "padrao";
          tags_span[1].innerText = "";
          break;
        case "Setor":
          ordenacao = "setor_a_z";
          tags_span[1].innerText = "(A → Z)";
          break;
        case "Setor (A → Z)":
          ordenacao = "setor_z_a";
          tags_span[1].innerText = "(Z → A)";
          break;
        case "Setor (Z → A)":
          ordenacao = "padrao";
          tags_span[1].innerText = "";
          break;
        case "Contato":
          ordenacao = "contato_a_z";
          tags_span[1].innerText = "(A → Z)";
          break;
        case "Contato (A → Z)":
          ordenacao = "contato_z_a";
          tags_span[1].innerText = "(Z → A)";
          break;
        case "Contato (Z → A)":
          ordenacao = "padrao";
          tags_span[1].innerText = "";
          break;
      }
      
      pagina = null;
      
      contador_de_filtro++;
      let numero_desta_acao_filtrar = contador_de_filtro;
      
      span_status_da_busca_animado.classList.remove("tag_oculta");
      span_status_da_busca.innerText = "Ordenando...";
      span_status_da_busca.classList.remove("tag_oculta");
      
      /* Requisição ajax */
      let conexao_ajax = null;
      if(window.XMLHttpRequest){
        conexao_ajax = new XMLHttpRequest();
      }else if(window.ActiveXObject){
        conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
      }
      const tipo = "GET";
      let url_mais = "";
      url_mais += "?filtro_nome=" + filtro_nome;
      url_mais += "&filtro_cpf=" + filtro_cpf;
      url_mais += "&filtro_data_de_nascimento=" + filtro_data_de_nascimento;
      url_mais += "&filtro_id_do_setor=" + filtro_id_do_setor;
      url_mais += "&quantidade_por_pagina=" + quantidade_por_pagina;
      url_mais += "&ordenacao=" + ordenacao;
      let url = "/tudo_em_um/mostrar_pessoas_ajax" + url_mais;
      let dados_post = null;
      let resposta = null;
      conexao_ajax.onreadystatechange = function(){
        if(conexao_ajax.readyState == 4){
          if(conexao_ajax.status == 200){
            resposta = JSON.parse(conexao_ajax.responseText);
            
            if(numero_desta_acao_filtrar >= contador_de_filtro){
              span_status_da_busca_animado.classList.add("tag_oculta");
              span_status_da_busca.innerText = "";
              span_status_da_busca.classList.add("tag_oculta");
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              div_lista_de_pessoas.innerHTML = resposta.lista;
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              
              atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
              
              links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
              pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
              if(typeof pagina_selecionada != "undefined"){
                eventos_dos_links_da_paginacao();
              }else{
                div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
                div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
              }
              
              links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
              eventos_dos_links_de_nome_da_pessoa();
              
              links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
              eventos_dos_links_de_editar_pessoa();
              
              links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
              eventos_dos_links_de_excluir_pessoa();
            }
          }
        }
      }
      conexao_ajax.open(tipo, url, true);
      conexao_ajax.setRequestHeader("Content-Type", "application/json");
      conexao_ajax.send(JSON.stringify(dados_post));
    });
  }
  
  /* Mostrar popup cadastrar pessoa */
  const div_tronco_do_popup_cadastrar_pessoa = document.getElementById("div_tronco_do_popup_cadastrar_pessoa");
  const link_cadastrar_pessoa = document.getElementById("link_cadastrar_pessoa");
  const div_mensagem_cadastrar_pessoa = document.getElementById("div_mensagem_cadastrar_pessoa");
  const span_status_cadastrar_pessoa_animado = document.getElementById("span_status_cadastrar_pessoa_animado");
  const span_mensagem_cadastrar_pessoa = document.getElementById("span_mensagem_cadastrar_pessoa");
  
  const campo_nome = document.getElementById("campo_nome");
  const campo_sobrenome = document.getElementById("campo_sobrenome");
  const campo_cpf = document.getElementById("campo_cpf");
  const campo_data_de_nascimento = document.getElementById("campo_data_de_nascimento");
  const botoes_de_radio_para_sexo = document.querySelectorAll("input[type='radio'][name='sexo']");
  const caixa_de_selecao_setor = document.getElementById("caixa_de_selecao_setor");
  const campo_email = document.getElementById("campo_email");
  const campo_telefone_fixo = document.getElementById("campo_telefone_fixo");
  const campo_telefone_movel = document.getElementById("campo_telefone_movel");
  const campo_telefone_estrangeiro = document.getElementById("campo_telefone_estrangeiro");
  
  link_cadastrar_pessoa.addEventListener("click", function(evento){
    evento.preventDefault();
    
    div_tronco_do_popup_cadastrar_pessoa.scroll_x = 0;
    div_tronco_do_popup_cadastrar_pessoa.scroll_y = 0;
    
    div_mensagem_cadastrar_pessoa.classList.add("tag_oculta");
    span_status_cadastrar_pessoa_animado.classList.add("tag_oculta");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_cadastrar_pessoa.innerText = "";
  });
  
  div_tronco_do_popup_cadastrar_pessoa.addEventListener("scroll", function(evento){
    div_tronco_do_popup_cadastrar_pessoa.scroll_x = evento.currentTarget.scrollLeft;
    div_tronco_do_popup_cadastrar_pessoa.scroll_y = evento.currentTarget.scrollTop;
  });
  
  /* Máscara do campo_cpf do formulário cadastrar */
  let ultimo_valor_campo_cpf = "";
  
  campo_cpf.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_cpf.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_cpf = campo_cpf.value;
      return;
    }
    
    campo_cpf.value = campo_cpf.value.replace(/[^0-9]/g, "");
    
    if(campo_cpf.value.length >= 3){
      campo_cpf.value = campo_cpf.value.slice(0, 3) + "." + campo_cpf.value.slice(3);
      if((posicao_do_cursor === 3 || posicao_do_cursor === 4) && campo_cpf.value.length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }else if(campo_cpf.value.length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length >= 7){
      campo_cpf.value = campo_cpf.value.slice(0, 7) + "." + campo_cpf.value.slice(7);
      if((posicao_do_cursor === 7 || posicao_do_cursor === 8) && campo_cpf.value.length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }else if(campo_cpf.value.length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length >= 11){
      campo_cpf.value = campo_cpf.value.slice(0, 11) + "-" + campo_cpf.value.slice(11);
      if((posicao_do_cursor === 11 || posicao_do_cursor === 12) && campo_cpf.value.length > ultimo_valor_campo_cpf.length){
        posicao_do_cursor++;
      }
    }
    if(campo_cpf.value.length > 14){
      campo_cpf.value = campo_cpf.value.slice(0, 14);
    }
    
    campo_cpf.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_cpf = campo_cpf.value;
  });
  
  /* Máscara do campo_telefone_fixo do formulário cadastrar */
  campo_telefone_fixo.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_telefone_fixo.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(campo_telefone_fixo.value.charAt(0) !== "("){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(0))){
        campo_telefone_fixo.value = "(" + campo_telefone_fixo.value;
        atualizacao_do_cursor++;
      }else{
        campo_telefone_fixo.value = "(" + campo_telefone_fixo.value.slice(1);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(1))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 1) + campo_telefone_fixo.value.slice(2);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(2))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 2) + campo_telefone_fixo.value.slice(3);
    }
    if(campo_telefone_fixo.value.length > 3 && campo_telefone_fixo.value.charAt(3) !== ")"){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(3))){
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 3) + ")" + campo_telefone_fixo.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 3) + ")" + campo_telefone_fixo.value.slice(4);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(4))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 4) + campo_telefone_fixo.value.slice(5);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(5))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 5) + campo_telefone_fixo.value.slice(6);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(6))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 6) + campo_telefone_fixo.value.slice(7);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(7))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 7) + campo_telefone_fixo.value.slice(8);
    }
    if(campo_telefone_fixo.value.length > 8 && campo_telefone_fixo.value.charAt(8) !== "-"){
      if(/[0-9]/.test(campo_telefone_fixo.value.charAt(8))){
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 8) + "-" + campo_telefone_fixo.value.slice(8);
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 8) + "-" + campo_telefone_fixo.value.slice(9);
      }
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(9))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 9) + campo_telefone_fixo.value.slice(10);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(10))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 10) + campo_telefone_fixo.value.slice(11);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(11))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 11) + campo_telefone_fixo.value.slice(12);
    }
    if(/[^0-9]/.test(campo_telefone_fixo.value.charAt(12))){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 12) + campo_telefone_fixo.value.slice(13);
    }
    if(campo_telefone_fixo.value.length > 13){
      campo_telefone_fixo.value = campo_telefone_fixo.value.slice(0, 13);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    campo_telefone_fixo.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Máscara do campo_telefone_movel do formulário cadastrar */
  campo_telefone_movel.addEventListener("keyup", function(evento){
    evento.preventDefault();
    
    let posicao_do_cursor = campo_telefone_movel.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(campo_telefone_movel.value.charAt(0) !== "("){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(0))){
        campo_telefone_movel.value = "(" + campo_telefone_movel.value;
        atualizacao_do_cursor++;
      }else{
        campo_telefone_movel.value = "(" + campo_telefone_movel.value.slice(1);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(1))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 1) + campo_telefone_movel.value.slice(2);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(2))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 2) + campo_telefone_movel.value.slice(3);
    }
    if(campo_telefone_movel.value.length > 3 && campo_telefone_movel.value.charAt(3) !== ")"){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(3))){
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 3) + ")" + campo_telefone_movel.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 3) + ")" + campo_telefone_movel.value.slice(4);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(4))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 4) + campo_telefone_movel.value.slice(5);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(5))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 5) + campo_telefone_movel.value.slice(6);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(6))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 6) + campo_telefone_movel.value.slice(7);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(7))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 7) + campo_telefone_movel.value.slice(8);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(8))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 8) + campo_telefone_movel.value.slice(9);
    }
    if(campo_telefone_movel.value.length > 9 && campo_telefone_movel.value.charAt(9) !== "-"){
      if(/[0-9]/.test(campo_telefone_movel.value.charAt(9))){
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 9) + "-" + campo_telefone_movel.value.slice(9);
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 9) + "-" + campo_telefone_movel.value.slice(10);
      }
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(10))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 10) + campo_telefone_movel.value.slice(11);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(11))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 11) + campo_telefone_movel.value.slice(12);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(12))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 12) + campo_telefone_movel.value.slice(13);
    }
    if(/[^0-9]/.test(campo_telefone_movel.value.charAt(13))){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 13) + campo_telefone_movel.value.slice(14);
    }
    if(campo_telefone_movel.value.length > 14){
      campo_telefone_movel.value = campo_telefone_movel.value.slice(0, 14);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    campo_telefone_movel.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  });
  
  /* Botão Cadastrar Pessoa */
  const div_botao_cadastrar = document.getElementById("div_botao_cadastrar");
  const botao_cadastrar = document.getElementById("botao_cadastrar");
  
  botao_cadastrar.addEventListener("click", function(){
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca_animado.classList.remove("tag_oculta");
    span_status_da_busca.innerText = "Atualizando...";
    span_status_da_busca.classList.remove("tag_oculta");
    
    let nome = campo_nome.value;
    let sobrenome = campo_sobrenome.value;
    let cpf = campo_cpf.value;
    let data_de_nascimento = campo_data_de_nascimento.value;
    
    let sexo = document.querySelector("input[type='radio'][name='sexo']:checked");
    if(sexo !== null){
      sexo = sexo.getAttribute("value");
    }
    
    let id_do_setor = caixa_de_selecao_setor.value;
    let email = campo_email.value;
    let telefone_fixo = campo_telefone_fixo.value;
    let telefone_movel = campo_telefone_movel.value;
    let telefone_estrangeiro = campo_telefone_estrangeiro.value;
    
    let anti_csrf = div_botao_cadastrar.querySelector("input[name='_token']").value;
    
    div_mensagem_cadastrar_pessoa.classList.remove("tag_oculta");
    span_status_cadastrar_pessoa_animado.classList.remove("tag_oculta");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_cadastrar_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_cadastrar_pessoa.innerText = "Aguarde...";
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/cadastrar_pessoa_ajax" + url_mais;
    let dados_post = {filtro_nome: "", filtro_cpf: "", filtro_data_de_nascimento: "", 
                      filtro_id_do_setor: "", quantidade_por_pagina: "", ordenacao: null, nome: nome, 
                      sobrenome: sobrenome, cpf: cpf, data_de_nascimento: data_de_nascimento, 
                      sexo: sexo, id_do_setor: id_do_setor, email: email, telefone_fixo: telefone_fixo, 
                      telefone_movel: telefone_movel, telefone_estrangeiro: telefone_estrangeiro, 
                      _token: anti_csrf};
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(typeof resposta.mensagem_de_falha != "undefined"){
            span_status_cadastrar_pessoa_animado.classList.add("tag_oculta");
            span_mensagem_cadastrar_pessoa.setAttribute("class", "mensagem_de_falha");
            span_mensagem_cadastrar_pessoa.innerText = resposta.mensagem_de_falha;
            
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            return;
          }
          if(typeof resposta.mensagem_de_sucesso != "undefined"){
            span_status_cadastrar_pessoa_animado.classList.add("tag_oculta");
            span_mensagem_cadastrar_pessoa.setAttribute("class", "mensagem_de_sucesso");
            span_mensagem_cadastrar_pessoa.innerText = resposta.mensagem_de_sucesso;
            
            campo_nome.value = "";
            campo_sobrenome.value = "";
            campo_cpf.value = "";
            campo_data_de_nascimento.value = "";
            
            for(let i = 0; i < botoes_de_radio_para_sexo.length; i++){
              botoes_de_radio_para_sexo[i].checked = false;
            }
            
            caixa_de_selecao_setor.value = "";
            campo_email.value = "";
            campo_telefone_fixo.value = "";
            campo_telefone_movel.value = "";
            campo_telefone_estrangeiro.value = "";
          }
          if(numero_desta_acao_filtrar >= contador_de_filtro){
            campo_filtro_nome.value = "";
            campo_filtro_cpf.value = "";
            campo_filtro_data_de_nascimento.value = "";
            caixa_de_selecao_filtro_setor.value = "";
            caixa_de_selecao_quantidade_por_pagina.value = "padrao";
            
            partes_da_lista[0].querySelectorAll("span")[1].innerText = "";
            partes_da_lista[1].querySelectorAll("span")[1].innerText = "";
            partes_da_lista[2].querySelectorAll("span")[1].innerText = "";
            partes_da_lista[3].querySelectorAll("span")[1].innerText = "";
            ordenacao = null;
            
            pagina = null;
            
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            div_lista_de_pessoas.innerHTML = resposta.lista;
            div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
            
            atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
            
            links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
            pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
            if(typeof pagina_selecionada != "undefined"){
              eventos_dos_links_da_paginacao();
            }else{
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
            }
            
            links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
            eventos_dos_links_de_nome_da_pessoa();
            
            links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
            eventos_dos_links_de_editar_pessoa();
            
            links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
            eventos_dos_links_de_excluir_pessoa();
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  });
  
  /* Mostrar popup visualizar pessoa */
  const div_visualizar_pessoa = document.getElementById("div_visualizar_pessoa");
  const div_parte_util_do_popup_visualizar_pessoa = document.getElementById("div_parte_util_do_popup_visualizar_pessoa");
  let links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
  
  eventos_dos_links_de_nome_da_pessoa();
  
  function eventos_dos_links_de_nome_da_pessoa(){
    for(let i = 0; i < links_de_nome_da_pessoa.length; i++){
      links_de_nome_da_pessoa[i].removeEventListener("click", evento_click_do_link_nome_da_pessoa);
      links_de_nome_da_pessoa[i].addEventListener("click", evento_click_do_link_nome_da_pessoa);
    }
  }
  
  function evento_click_do_link_nome_da_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    const href = tag_que_disparou_o_evento.getAttribute("href");
    const id_da_pessoa = href.replace("pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = document.getElementById("div_visualizar_pessoa_do_id_" + id_da_pessoa).innerHTML;
    
    var opcoes = {};
    const bs_modal_visualizar_pessoa = new Modal(div_visualizar_pessoa, opcoes);
    
    bs_modal_visualizar_pessoa.show();
    
    div_parte_util_do_popup_visualizar_pessoa.innerHTML = html;
    
    div_visualizar_pessoa.setAttribute("aria-labelledby", "h3_titulo_visualizar_pessoa_do_id_" + id_da_pessoa);
  }
  
  /* Mostrar popup editar pessoa */
  const div_parte_util_do_popup_editar_pessoa = document.getElementById("div_parte_util_do_popup_editar_pessoa");
  let links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
  
  eventos_dos_links_de_editar_pessoa();
  
  function eventos_dos_links_de_editar_pessoa(){
    var opcoes = {
      "customClass": "tooltip_link_da_opcao_da_lista",
      "placement": "top"
    };
    for(let i = 0; i < links_de_editar_pessoa.length; i++){
      links_de_editar_pessoa[i].bs_tooltip_link_editar = new Tooltip(links_de_editar_pessoa[i], opcoes);
      links_de_editar_pessoa[i].removeEventListener("click", evento_click_do_link_editar_pessoa);
      links_de_editar_pessoa[i].addEventListener("click", evento_click_do_link_editar_pessoa);
    }
  }
  
  function evento_click_do_link_editar_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.blur();
    
    const href = tag_que_disparou_o_evento.getAttribute("href");
    const id_da_pessoa = href.replace("editar_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = document.getElementById("div_editar_pessoa_do_id_" + id_da_pessoa).innerHTML;
    
    var opcoes = {};
    const bs_modal_editar_pessoa = new Modal(div_editar_pessoa, opcoes);
    
    bs_modal_editar_pessoa.show();
    
    div_parte_util_do_popup_editar_pessoa.innerHTML = html;
    
    div_editar_pessoa.setAttribute("aria-labelledby", "h3_titulo_editar_pessoa_do_id_" + id_da_pessoa);
    
    eventos_da_div_editar();
  }
  
  function eventos_da_div_editar(){
    const div_tronco_do_popup_editar_pessoa = div_parte_util_do_popup_editar_pessoa.getElementsByClassName("div_tronco_do_popup_editar_pessoa")[0];
    div_tronco_do_popup_editar_pessoa.scroll_x = 0;
    div_tronco_do_popup_editar_pessoa.scroll_y = 0;
    div_tronco_do_popup_editar_pessoa.addEventListener("scroll", evento_scroll_da_div_tronco_do_popup_editar_pessoa);
    
    const labels_comuns_da_div_editar_pessoa = div_parte_util_do_popup_editar_pessoa.querySelectorAll("label:not(.item_da_lista_de_sexos)");
    for(let i = 0; i < labels_comuns_da_div_editar_pessoa.length; i++){
      labels_comuns_da_div_editar_pessoa[i].addEventListener("click", evento_das_labels_comuns_da_div_editar_pessoa);
    }
    
    const labels_sexo_da_div_editar_pessoa = div_parte_util_do_popup_editar_pessoa.querySelectorAll("label.item_da_lista_de_sexos");
    for(let i = 0; i < labels_sexo_da_div_editar_pessoa.length; i++){
      labels_sexo_da_div_editar_pessoa[i].addEventListener("click", evento_das_labels_sexo_da_div_editar_pessoa);
    }
    
    const campo_cpf = div_parte_util_do_popup_editar_pessoa.getElementsByClassName("campo_cpf")[0];
    campo_cpf.addEventListener("keyup", evento_do_campo_cpf);
    
    const campo_data_de_nascimento = div_parte_util_do_popup_editar_pessoa.getElementsByClassName("campo_data_de_nascimento")[0];
    campo_data_de_nascimento.addEventListener("input", evento_input_do_campo_data_de_nascimento);
    campo_data_de_nascimento.addEventListener("click", evento_click_do_campo_data_de_nascimento);
    
    const span_icone_de_calendario_do_campo_data_de_nascimento = div_parte_util_do_popup_editar_pessoa.getElementsByClassName("span_icone_de_calendario_do_campo_data_de_nascimento")[0];
    span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("click", evento_click_do_span_icone_de_calendario_do_campo_data_de_nascimento);
    span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mousedown", evento_mousedown_do_span_icone_de_calendario_do_campo_data_de_nascimento);
    
    const campo_telefone_fixo = div_parte_util_do_popup_editar_pessoa.getElementsByClassName("campo_telefone_fixo")[0];
    campo_telefone_fixo.addEventListener("keyup", evento_do_campo_telefone_fixo);
    
    const campo_telefone_movel = div_parte_util_do_popup_editar_pessoa.getElementsByClassName("campo_telefone_movel")[0];
    campo_telefone_movel.addEventListener("keyup", evento_do_campo_telefone_movel);
    
    const botao_editar = div_parte_util_do_popup_editar_pessoa.querySelector(".div_botao_editar>.botao_editar");
    botao_editar.addEventListener("click", evento_click_do_botao_editar_pessoa);
  }
  
  function evento_scroll_da_div_tronco_do_popup_editar_pessoa(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.scroll_x = evento.currentTarget.scrollLeft;
    tag_que_disparou_o_evento.scroll_y = evento.currentTarget.scrollTop;
  }
  
  /* Refazendo o comportamento dos labels */
  function evento_das_labels_comuns_da_div_editar_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    const atributo_for_do_label = tag_que_disparou_o_evento.getAttribute("for");
    
    const alvo_do_label = div_parte_util_do_popup_editar_pessoa.querySelector("." + atributo_for_do_label);
    if(alvo_do_label !== null){
      alvo_do_label.focus();
    }
  }
  function evento_das_labels_sexo_da_div_editar_pessoa(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    tag_que_disparou_o_evento.querySelector("input").checked = true;
  }
  
  /* Máscara do campo_cpf dos formulários de editar */
  let ultimo_valor_campo_cpf_do_formulario_de_editar = "";
  
  function evento_do_campo_cpf(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let posicao_do_cursor = tag_que_disparou_o_evento.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      ultimo_valor_campo_cpf_do_formulario_de_editar = tag_que_disparou_o_evento.value;
      return;
    }
    
    tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.replace(/[^0-9]/g, "");
    
    if(tag_que_disparou_o_evento.value.length >= 3){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + "." + tag_que_disparou_o_evento.value.slice(3);
      if((posicao_do_cursor === 3 || posicao_do_cursor === 4) && tag_que_disparou_o_evento.value.length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }else if(tag_que_disparou_o_evento.value.length >= 7 && posicao_do_cursor === 4){
        posicao_do_cursor++;
      }
    }
    if(tag_que_disparou_o_evento.value.length >= 7){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 7) + "." + tag_que_disparou_o_evento.value.slice(7);
      if((posicao_do_cursor === 7 || posicao_do_cursor === 8) && tag_que_disparou_o_evento.value.length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }else if(tag_que_disparou_o_evento.value.length >= 11 && posicao_do_cursor === 8){
        posicao_do_cursor++;
      }
    }
    if(tag_que_disparou_o_evento.value.length >= 11){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 11) + "-" + tag_que_disparou_o_evento.value.slice(11);
      if((posicao_do_cursor === 11 || posicao_do_cursor === 12) && tag_que_disparou_o_evento.value.length > ultimo_valor_campo_cpf_do_formulario_de_editar.length){
        posicao_do_cursor++;
      }
    }
    if(tag_que_disparou_o_evento.value.length > 14){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 14);
    }
    
    tag_que_disparou_o_evento.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
    
    ultimo_valor_campo_cpf_do_formulario_de_editar = tag_que_disparou_o_evento.value;
  }
  
  /* Máscara do campo_telefone_fixo dos formulários de editar */
  function evento_do_campo_telefone_fixo(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let posicao_do_cursor = tag_que_disparou_o_evento.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(tag_que_disparou_o_evento.value.charAt(0) !== "("){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(0))){
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value;
        atualizacao_do_cursor++;
      }else{
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value.slice(1);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(1))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 1) + tag_que_disparou_o_evento.value.slice(2);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(2))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 2) + tag_que_disparou_o_evento.value.slice(3);
    }
    if(tag_que_disparou_o_evento.value.length > 3 && tag_que_disparou_o_evento.value.charAt(3) !== ")"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(3))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(4);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(4))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 4) + tag_que_disparou_o_evento.value.slice(5);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(5))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 5) + tag_que_disparou_o_evento.value.slice(6);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(6))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 6) + tag_que_disparou_o_evento.value.slice(7);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(7))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 7) + tag_que_disparou_o_evento.value.slice(8);
    }
    if(tag_que_disparou_o_evento.value.length > 8 && tag_que_disparou_o_evento.value.charAt(8) !== "-"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(8))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 8) + "-" + tag_que_disparou_o_evento.value.slice(8);
        if(posicao_do_cursor >= 8){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 8) + "-" + tag_que_disparou_o_evento.value.slice(9);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(9))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 9) + tag_que_disparou_o_evento.value.slice(10);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(10))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 10) + tag_que_disparou_o_evento.value.slice(11);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(11))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 11) + tag_que_disparou_o_evento.value.slice(12);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(12))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 12) + tag_que_disparou_o_evento.value.slice(13);
    }
    if(tag_que_disparou_o_evento.value.length > 13){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 13);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    tag_que_disparou_o_evento.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  }
  
  /* Máscara do campo_telefone_movel dos formulários de editar */
  function evento_do_campo_telefone_movel(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    
    let posicao_do_cursor = tag_que_disparou_o_evento.selectionStart;
    if(typeof posicao_do_cursor !== "number"){
      /* Se o navegador não suportar, cancela. */
      return;
    }
    
    const teclas_para_ignorar = [
      "Enter", "Tab", "Shift", "Control", "Backspace", "Home", "End", "Delete", 
      "Up", "Right", "Down", "Left", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"
    ];
    if(teclas_para_ignorar.indexOf(evento.key) >= 0){
      return;
    }
    
    let atualizacao_do_cursor = 0;
    
    if(tag_que_disparou_o_evento.value.charAt(0) !== "("){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(0))){
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value;
        atualizacao_do_cursor++;
      }else{
        tag_que_disparou_o_evento.value = "(" + tag_que_disparou_o_evento.value.slice(1);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(1))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 1) + tag_que_disparou_o_evento.value.slice(2);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(2))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 2) + tag_que_disparou_o_evento.value.slice(3);
    }
    if(tag_que_disparou_o_evento.value.length > 3 && tag_que_disparou_o_evento.value.charAt(3) !== ")"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(3))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(3);
        if(posicao_do_cursor >= 3){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 3) + ")" + tag_que_disparou_o_evento.value.slice(4);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(4))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 4) + tag_que_disparou_o_evento.value.slice(5);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(5))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 5) + tag_que_disparou_o_evento.value.slice(6);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(6))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 6) + tag_que_disparou_o_evento.value.slice(7);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(7))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 7) + tag_que_disparou_o_evento.value.slice(8);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(8))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 8) + tag_que_disparou_o_evento.value.slice(9);
    }
    if(tag_que_disparou_o_evento.value.length > 9 && tag_que_disparou_o_evento.value.charAt(9) !== "-"){
      if(/[0-9]/.test(tag_que_disparou_o_evento.value.charAt(9))){
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 9) + "-" + tag_que_disparou_o_evento.value.slice(9);
        if(posicao_do_cursor >= 9){
          atualizacao_do_cursor++;
        }
      }else{
        tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 9) + "-" + tag_que_disparou_o_evento.value.slice(10);
      }
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(10))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 10) + tag_que_disparou_o_evento.value.slice(11);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(11))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 11) + tag_que_disparou_o_evento.value.slice(12);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(12))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 12) + tag_que_disparou_o_evento.value.slice(13);
    }
    if(/[^0-9]/.test(tag_que_disparou_o_evento.value.charAt(13))){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 13) + tag_que_disparou_o_evento.value.slice(14);
    }
    if(tag_que_disparou_o_evento.value.length > 14){
      tag_que_disparou_o_evento.value = tag_que_disparou_o_evento.value.slice(0, 14);
    }
    
    posicao_do_cursor += atualizacao_do_cursor;
    tag_que_disparou_o_evento.setSelectionRange(posicao_do_cursor, posicao_do_cursor);
  }
  
  /* Botão Editar Pessoa */
  function evento_click_do_botao_editar_pessoa(){
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca_animado.classList.remove("tag_oculta");
    span_status_da_busca.innerText = "Atualizando...";
    span_status_da_busca.classList.remove("tag_oculta");
    
    const campo_nome = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_nome");
    const campo_sobrenome = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_sobrenome");
    const campo_cpf = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_cpf");
    const campo_data_de_nascimento = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_data_de_nascimento");
    const caixa_de_selecao_setor = div_parte_util_do_popup_editar_pessoa.querySelector(".caixa_de_selecao_setor");
    const campo_email = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_email");
    const campo_telefone_fixo = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_telefone_fixo");
    const campo_telefone_movel = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_telefone_movel");
    const campo_telefone_estrangeiro = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_telefone_estrangeiro");
    
    let nome = campo_nome.value;
    let sobrenome = campo_sobrenome.value;
    let cpf = campo_cpf.value;
    let data_de_nascimento = campo_data_de_nascimento.value;
    
    let sexo = div_parte_util_do_popup_editar_pessoa.querySelector("label.item_da_lista_de_sexos>input[type='radio'][name^='sexo_da_pessoa_do_id_']:checked");
    if(sexo !== null){
      sexo = sexo.getAttribute("value");
    }
    
    let id_do_setor = caixa_de_selecao_setor.value;
    let email = campo_email.value;
    let telefone_fixo = campo_telefone_fixo.value;
    let telefone_movel = campo_telefone_movel.value;
    let telefone_estrangeiro = campo_telefone_estrangeiro.value;
    
    const div_botao_editar = div_parte_util_do_popup_editar_pessoa.querySelector(".div_botao_editar");
    
    const anti_csrf = div_botao_editar.querySelector("input[name='_token']").value;
    
    const id_da_pessoa = div_botao_editar.querySelector(".campo_id_da_pessoa").value;
    
    const div_mensagem = div_parte_util_do_popup_editar_pessoa.querySelector(".div_mensagem");
    div_mensagem.classList.remove("tag_oculta");
    
    const span_status_editar_pessoa_animado = div_mensagem.querySelector(".span_status_editar_pessoa_animado");
    span_status_editar_pessoa_animado.classList.remove("tag_oculta");
    
    const span_mensagem_editar_pessoa = div_mensagem.querySelector(".span_mensagem_editar_pessoa");
    span_mensagem_editar_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_editar_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_editar_pessoa.innerText = "Aguarde...";
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/editar_pessoa_ajax" + url_mais;
    let dados_post = {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, 
                      filtro_data_de_nascimento: filtro_data_de_nascimento, 
                      filtro_id_do_setor: filtro_id_do_setor, 
                      quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, 
                      pagina: pagina, nome: nome, sobrenome: sobrenome, cpf: cpf, 
                      data_de_nascimento: data_de_nascimento, sexo: sexo, id_do_setor: id_do_setor, 
                      email: email, telefone_fixo: telefone_fixo, telefone_movel: telefone_movel, 
                      telefone_estrangeiro: telefone_estrangeiro, id_da_pessoa: id_da_pessoa, 
                      _token: anti_csrf};
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(typeof resposta.mensagem_de_falha != "undefined"){
            span_status_editar_pessoa_animado.classList.add("tag_oculta");
            span_mensagem_editar_pessoa.classList.add("mensagem_de_falha");
            span_mensagem_editar_pessoa.innerText = resposta.mensagem_de_falha;
            
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            return;
          }
          if(typeof resposta.mensagem_de_sucesso != "undefined"){
            span_status_editar_pessoa_animado.classList.add("tag_oculta");
            span_mensagem_editar_pessoa.classList.add("mensagem_de_sucesso");
            span_mensagem_editar_pessoa.innerText = resposta.mensagem_de_sucesso;
            
            if(numero_desta_acao_filtrar >= contador_de_filtro){
              span_status_da_busca_animado.classList.add("tag_oculta");
              span_status_da_busca.innerText = "";
              span_status_da_busca.classList.add("tag_oculta");
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              div_lista_de_pessoas.innerHTML = resposta.lista;
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              
              const div_editar_desta_pessoa = document.getElementById("div_editar_pessoa_do_id_" + id_da_pessoa);
              if(div_editar_desta_pessoa !== null){
                div_parte_util_do_popup_editar_pessoa.innerHTML = div_editar_desta_pessoa.innerHTML;
              }
              
              const div_mensagem_apos_atualizacao = div_parte_util_do_popup_editar_pessoa.querySelector(".div_mensagem");
              div_mensagem_apos_atualizacao.classList.remove("tag_oculta");
              
              const span_mensagem_editar_pessoa_apos_atualizacao = div_mensagem_apos_atualizacao.querySelector(".span_mensagem_editar_pessoa");
              span_mensagem_editar_pessoa_apos_atualizacao.classList.add("mensagem_de_sucesso");
              span_mensagem_editar_pessoa_apos_atualizacao.innerText = resposta.mensagem_de_sucesso;
              
              links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
              pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
              if(typeof pagina_selecionada != "undefined"){
                eventos_dos_links_da_paginacao();
              }else{
                div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
                div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
              }
              
              links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
              eventos_dos_links_de_nome_da_pessoa();
              
              links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
              eventos_dos_links_de_editar_pessoa();
              
              links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
              eventos_dos_links_de_excluir_pessoa();
              
              eventos_da_div_editar();
            }
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  /* Mostrar popup excluir pessoa */
  const div_excluir_pessoa = document.getElementById("div_excluir_pessoa");
  const div_parte_util_do_popup_excluir_pessoa = document.getElementById("div_parte_util_do_popup_excluir_pessoa");
  let links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
  
  eventos_dos_links_de_excluir_pessoa();
  
  function eventos_dos_links_de_excluir_pessoa(){
    var opcoes = {
      "customClass": "tooltip_link_da_opcao_da_lista",
      "placement": "top"
    };
    for(let i = 0; i < links_excluir_pessoa.length; i++){
      links_excluir_pessoa[i].bs_tooltip_link_editar = new Tooltip(links_excluir_pessoa[i], opcoes);
      links_excluir_pessoa[i].removeEventListener("click", evento_click_do_link_excluir_pessoa);
      links_excluir_pessoa[i].addEventListener("click", evento_click_do_link_excluir_pessoa);
    }
  }
  
  function evento_click_do_link_excluir_pessoa(evento){
    evento.preventDefault();
    
    const tag_que_disparou_o_evento = evento.currentTarget;
    tag_que_disparou_o_evento.blur();
    
    const href = tag_que_disparou_o_evento.getAttribute("href");
    const id_da_pessoa = href.replace("excluir_pessoa?id=", "");
    
    if(isNaN(id_da_pessoa) || id_da_pessoa % 1 != 0 || id_da_pessoa <= 0){
      return;
    }
    
    const html = document.getElementById("div_excluir_pessoa_do_id_" + id_da_pessoa).innerHTML;
    
    var opcoes = {};
    const bs_modal_excluir_pessoa = new Modal(div_excluir_pessoa, opcoes);
    
    bs_modal_excluir_pessoa.show();
    
    div_parte_util_do_popup_excluir_pessoa.innerHTML = html;
    
    div_excluir_pessoa.setAttribute("aria-labelledby", "h3_titulo_excluir_pessoa_do_id_" + id_da_pessoa);
    
    eventos_da_div_excluir();
  }
  
  function eventos_da_div_excluir(){
    const botao_excluir = div_parte_util_do_popup_excluir_pessoa.querySelector(".botao_excluir");
    botao_excluir.addEventListener("click", evento_click_do_botao_excluir_pessoa);
  }
  
  /* Botão Excluir Pessoa */
  function evento_click_do_botao_excluir_pessoa(){
    let filtro_nome = campo_filtro_nome.value;
    let filtro_cpf = campo_filtro_cpf.value;
    let filtro_data_de_nascimento = campo_filtro_data_de_nascimento.value;
    let filtro_id_do_setor = caixa_de_selecao_filtro_setor.value;
    let quantidade_por_pagina = caixa_de_selecao_quantidade_por_pagina.value;
    
    contador_de_filtro++;
    let numero_desta_acao_filtrar = contador_de_filtro;
    
    span_status_da_busca_animado.classList.remove("tag_oculta");
    span_status_da_busca.innerText = "Atualizando...";
    span_status_da_busca.classList.remove("tag_oculta");
    
    const div_botao_excluir = div_parte_util_do_popup_excluir_pessoa.querySelector(".div_botao_excluir");
    
    const anti_csrf = div_botao_excluir.querySelector("input[name='_token']").value;
    
    const id_da_pessoa = div_botao_excluir.querySelector(".campo_id_da_pessoa").value;
    
    const div_mensagem = div_parte_util_do_popup_excluir_pessoa.querySelector(".div_mensagem");
    div_mensagem.classList.remove("tag_oculta");
    
    const span_status_excluir_pessoa_animado = div_mensagem.querySelector(".span_status_excluir_pessoa_animado");
    span_status_excluir_pessoa_animado.classList.remove("tag_oculta");
    
    const span_mensagem_excluir_pessoa = div_mensagem.querySelector(".span_mensagem_excluir_pessoa");
    span_mensagem_excluir_pessoa.classList.remove("mensagem_de_falha");
    span_mensagem_excluir_pessoa.classList.remove("mensagem_de_sucesso");
    span_mensagem_excluir_pessoa.innerText = "Aguarde...";
    
    /* Requisição ajax */
    let conexao_ajax = null;
    if(window.XMLHttpRequest){
      conexao_ajax = new XMLHttpRequest();
    }else if(window.ActiveXObject){
      conexao_ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    const tipo = "POST";
    let url_mais = "";
    let url = "/tudo_em_um/excluir_pessoa_ajax" + url_mais;
    let dados_post = {filtro_nome: filtro_nome, filtro_cpf: filtro_cpf, 
                      filtro_data_de_nascimento: filtro_data_de_nascimento, 
                      filtro_id_do_setor: filtro_id_do_setor, 
                      quantidade_por_pagina: quantidade_por_pagina, ordenacao: ordenacao, 
                      pagina: pagina, id_da_pessoa: id_da_pessoa, _token: anti_csrf};
    let resposta = null;
    conexao_ajax.onreadystatechange = function(){
      if(conexao_ajax.readyState == 4){
        if(conexao_ajax.status == 200){
          resposta = JSON.parse(conexao_ajax.responseText);
          
          if(typeof resposta.mensagem_de_falha != "undefined"){
            span_status_excluir_pessoa_animado.classList.add("tag_oculta");
            span_mensagem_excluir_pessoa.classList.add("mensagem_de_falha");
            span_mensagem_excluir_pessoa.innerText = resposta.mensagem_de_falha;
            
            span_status_da_busca_animado.classList.add("tag_oculta");
            span_status_da_busca.innerText = "";
            span_status_da_busca.classList.add("tag_oculta");
            return;
          }
          if(typeof resposta.mensagem_de_sucesso != "undefined"){
            span_status_excluir_pessoa_animado.classList.add("tag_oculta");
            span_mensagem_excluir_pessoa.classList.add("mensagem_de_sucesso");
            span_mensagem_excluir_pessoa.innerText = resposta.mensagem_de_sucesso;
            
            if(numero_desta_acao_filtrar >= contador_de_filtro){
              span_status_da_busca_animado.classList.add("tag_oculta");
              span_status_da_busca.innerText = "";
              span_status_da_busca.classList.add("tag_oculta");
              div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              div_lista_de_pessoas.innerHTML = resposta.lista;
              div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = resposta.paginacao;
              
              atualizando_botoes_de_radio_de_um_popup("div_editar_pessoa");
              
              links_da_paginacao = document.querySelectorAll("#div_paginacao_de_cima_da_lista_de_pessoas>a, #div_paginacao_de_baixo_da_lista_de_pessoas>a");
              pagina_selecionada = document.getElementsByClassName("pagina_selecionada")[0];
              if(typeof pagina_selecionada != "undefined"){
                eventos_dos_links_da_paginacao();
              }else{
                div_paginacao_de_cima_da_lista_de_pessoas.innerHTML = "";
                div_paginacao_de_baixo_da_lista_de_pessoas.innerHTML = "";
              }
              
              links_de_nome_da_pessoa = document.getElementsByClassName("nome_da_pessoa");
              eventos_dos_links_de_nome_da_pessoa();
              
              links_de_editar_pessoa = document.getElementsByClassName("link_editar_pessoa");
              eventos_dos_links_de_editar_pessoa();
              
              links_excluir_pessoa = document.getElementsByClassName("link_excluir_pessoa");
              eventos_dos_links_de_excluir_pessoa();
            }
          }
        }
      }
    }
    conexao_ajax.open(tipo, url, true);
    conexao_ajax.setRequestHeader("Content-Type", "application/json");
    conexao_ajax.send(JSON.stringify(dados_post));
  }
  
  /* Seletor de data (calendário) dos campos de data */
  const span_icone_de_calendario_do_campo_filtro_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_filtro_data_de_nascimento");
  const span_icone_de_calendario_do_campo_data_de_nascimento = document.getElementById("span_icone_de_calendario_do_campo_data_de_nascimento");
  const div_calendario = document.getElementById("div_calendario");
  const caixa_de_selecao_de_mes_do_calendario = document.getElementById("caixa_de_selecao_de_mes_do_calendario");
  const caixa_de_selecao_de_ano_do_calendario = document.getElementById("caixa_de_selecao_de_ano_do_calendario");
  const celulas_do_calendario = document.getElementsByClassName("celula_do_calendario");
  
  let alvo_do_calendario = null;
  let dia_selecionado = null;
  let ocultar_div_calendario = true;
  
  campo_filtro_data_de_nascimento.addEventListener("input", function(){
    if(alvo_do_calendario === "filtro_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  campo_data_de_nascimento.addEventListener("input", function(){
    if(alvo_do_calendario === "cadastrar_data_de_nascimento"){
      atualizar_calendario();
    }
  });
  function evento_input_do_campo_data_de_nascimento(){
    if(alvo_do_calendario === "editar_data_de_nascimento"){
      atualizar_calendario();
    }
  }
  
  campo_filtro_data_de_nascimento.addEventListener("click", function(){
    if(alvo_do_calendario === "filtro_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  campo_data_de_nascimento.addEventListener("click", function(){
    if(alvo_do_calendario === "cadastrar_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  });
  function evento_click_do_campo_data_de_nascimento(){
    if(alvo_do_calendario === "editar_data_de_nascimento"){
      ocultar_div_calendario = false;
    }
  }
  
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
    mostrar_calendario("filtro_data_de_nascimento");
  });
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("click", function(){
    ocultar_div_calendario = false;
    mostrar_calendario("cadastrar_data_de_nascimento");
  });
  function evento_click_do_span_icone_de_calendario_do_campo_data_de_nascimento(){
    ocultar_div_calendario = false;
    mostrar_calendario("editar_data_de_nascimento");
  }
  
  /* Impedindo clique duplo selecionar o texto */
  span_icone_de_calendario_do_campo_filtro_data_de_nascimento.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  span_icone_de_calendario_do_campo_data_de_nascimento.addEventListener("mousedown", function(evento){
    evento.preventDefault();
  });
  function evento_mousedown_do_span_icone_de_calendario_do_campo_data_de_nascimento(evento){
    evento.preventDefault();
  }
  
  function mostrar_calendario(referencia_do_campo){
    if(div_calendario.classList.contains("tag_oculta") || alvo_do_calendario !== referencia_do_campo){
      div_calendario.classList.remove("tag_oculta");
      
      alvo_do_calendario = referencia_do_campo;
      
      let posicao_x = 0;
      let posicao_y = 0;
      
      let campo_alvo = null;
      switch(alvo_do_calendario){
        case "filtro_data_de_nascimento":
          div_pagina_tudo_em_um.appendChild(div_calendario);
          campo_alvo = campo_filtro_data_de_nascimento;
          
          posicao_x += campo_alvo.getBoundingClientRect().left + window.scrollX;
          posicao_y += campo_alvo.getBoundingClientRect().top + window.scrollY;
        break;
        case "cadastrar_data_de_nascimento":
          div_tronco_do_popup_cadastrar_pessoa.appendChild(div_calendario);
          campo_alvo = campo_data_de_nascimento;
          
          var estilo_computado = window.getComputedStyle(div_tronco_do_popup_cadastrar_pessoa);
          posicao_x += parseInt(estilo_computado.paddingLeft, 10);
          
          posicao_y += campo_alvo.getBoundingClientRect().top;
          posicao_y -= div_tronco_do_popup_cadastrar_pessoa.getBoundingClientRect().top;
          posicao_y += div_tronco_do_popup_cadastrar_pessoa.scroll_y;
        break;
        case "editar_data_de_nascimento":
          const div_tronco_do_popup_editar_pessoa = div_parte_util_do_popup_editar_pessoa.querySelector(".div_tronco_do_popup_editar_pessoa");
          div_tronco_do_popup_editar_pessoa.appendChild(div_calendario);
          campo_alvo = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_data_de_nascimento");
          
          var estilo_computado = window.getComputedStyle(div_tronco_do_popup_editar_pessoa);
          posicao_x += parseInt(estilo_computado.paddingLeft, 10);
          
          posicao_y += campo_alvo.getBoundingClientRect().top;
          posicao_y -= div_tronco_do_popup_editar_pessoa.getBoundingClientRect().top;
          posicao_y += div_tronco_do_popup_editar_pessoa.scroll_y;
        break;
      }
      
      var estilo_computado = window.getComputedStyle(campo_alvo);
      const largura_do_campo_alvo = parseInt(estilo_computado.width, 10);
      const altura_do_campo_alvo = parseInt(estilo_computado.height, 10);
      posicao_y += altura_do_campo_alvo;
      
      var estilo_computado = window.getComputedStyle(div_calendario);
      const largura_do_calendario = parseInt(estilo_computado.width, 10);
      var diferenca_de_larguras = largura_do_campo_alvo - largura_do_calendario;
      if(posicao_x + diferenca_de_larguras / 2 >= 0){
        posicao_x += diferenca_de_larguras / 2;
      }
      
      div_calendario.style.position = "absolute";
      div_calendario.style.top = posicao_y + "px";
      div_calendario.style.left = posicao_x + "px";
      if(window.innerWidth <= largura_do_calendario){
        div_calendario.style.left = "0px";
      }
      
      atualizar_calendario();
    }else{
      div_calendario.classList.add("tag_oculta");
    }
  }
  
  function atualizar_calendario(){
    let campo_alvo = null;
    switch(alvo_do_calendario){
      case "filtro_data_de_nascimento":
        campo_alvo = campo_filtro_data_de_nascimento;
      break;
      case "cadastrar_data_de_nascimento":
        campo_alvo = campo_data_de_nascimento;
      break;
      case "editar_data_de_nascimento":
        campo_alvo = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_data_de_nascimento");
      break;
    }
    
    let valor = campo_alvo.value;
    let dia = null;
    let mes = null;
    let ano = null;
    let total_de_dias_do_mes = null;
    let ano_referencia = null;
    
    if(valor !== null && valor.match(/^\d{2}\/(0[1-9]|1[0-2])\/\d{4}$/)){
      dia = valor.substring(0, 2);
      mes = valor.substring(3, 5);
      ano = valor.substring(6, 10);
      
      if(dia.substring(0, 1) === "0"){
        dia = dia.substring(1, 2);
      }
      dia = parseInt(dia, 10);
      
      if(mes.substring(0, 1) === "0"){
        mes = mes.substring(1, 2);
      }
      mes = parseInt(mes, 10);
      
      ano = parseInt(ano, 10);
      
      total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
      
      ano_referencia = ano;
      
      if(dia > total_de_dias_do_mes){
        dia = total_de_dias_do_mes;
      }
    }else{
      const data_atual = new Date();
      dia = data_atual.getDate();
      mes = data_atual.getMonth() + 1;
      ano = data_atual.getFullYear() - 30;
      total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
      ano_referencia = ano;
    }
    
    dia_selecionado = dia;
    
    caixa_de_selecao_de_mes_do_calendario.value = mes;
    
    const menor_ano = ano_referencia - 6;
    const maior_ano = ano_referencia + 5;
    caixa_de_selecao_de_ano_do_calendario.innerHTML = "";
    for(let i = menor_ano; i <= maior_ano; i++){
      let elemento_ano = document.createElement("option");
      elemento_ano.setAttribute("value", i);
      elemento_ano.innerText = i;
      caixa_de_selecao_de_ano_do_calendario.appendChild(elemento_ano);
    }
    caixa_de_selecao_de_ano_do_calendario.value = ano;
    
    gerar_dias_do_mes(total_de_dias_do_mes);
  }
  
  caixa_de_selecao_de_mes_do_calendario.addEventListener("change", function(){
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    const total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(total_de_dias_do_mes);
  });
  
  caixa_de_selecao_de_ano_do_calendario.addEventListener("change", function(){
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    const total_de_dias_do_mes = calcular_total_de_dias_do_mes(ano, mes);
    gerar_dias_do_mes(total_de_dias_do_mes);
  });
  
  function calcular_total_de_dias_do_mes(ano, mes){
    const mes_seguinte = mes + 1;
    const total_de_dias_do_mes = new Date(ano, mes_seguinte - 1, 0).getDate();
    return total_de_dias_do_mes;
  }
  
  function gerar_dias_do_mes(total_de_dias_do_mes){
    if(dia_selecionado > total_de_dias_do_mes){
      dia_selecionado = total_de_dias_do_mes;
    }
    
    const mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    const dia_da_semana_do_primeiro_dia_do_mes = new Date(ano, mes - 1, 1).getDay() + 1;
    const posicao_inicial = 7; //As posições de 0 a 6 são as legendas (exemplo: Dom, Seg, Ter e etc).
    const posicao_do_primeiro_dia = dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    const posicao_do_ultimo_dia = total_de_dias_do_mes - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    let posicao_do_dia_selecionado = dia_selecionado - 1 + dia_da_semana_do_primeiro_dia_do_mes - 1 + posicao_inicial;
    
    let numero_do_dia = 0;
    for(let i = posicao_inicial; i < celulas_do_calendario.length; i++){
      celulas_do_calendario[i].innerHTML = "";
      celulas_do_calendario[i].classList.remove("dia_do_calendario");
      celulas_do_calendario[i].classList.remove("dia_escolhido");
      celulas_do_calendario[i].removeEventListener("click", evento_selecionar_dia);
      
      if(i >= posicao_do_primeiro_dia && i <= posicao_do_ultimo_dia){
        numero_do_dia++;
        celulas_do_calendario[i].classList.remove("tag_oculta");
        celulas_do_calendario[i].classList.add("dia_do_calendario");
        celulas_do_calendario[i].innerHTML = "<span>" + numero_do_dia + "</span>";
        if(i === posicao_do_dia_selecionado){
          celulas_do_calendario[i].classList.add("dia_escolhido");
        }
        celulas_do_calendario[i].addEventListener("click", evento_selecionar_dia);
      }else if(i > posicao_do_ultimo_dia){
        celulas_do_calendario[i].classList.add("tag_oculta");
      }
    }
  }
  
  function evento_selecionar_dia(evento){
    const tag_que_disparou_o_evento = evento.currentTarget;
    for(let i = 0; i < celulas_do_calendario.length; i++){
      celulas_do_calendario[i].classList.remove("dia_escolhido");
    }
    tag_que_disparou_o_evento.classList.add("dia_escolhido");
    dia_selecionado = tag_que_disparou_o_evento.innerText;
    
  }
  
  botao_confirmar_do_calendario.addEventListener("click", function(){
    let campo_alvo = null;
    switch(alvo_do_calendario){
      case "filtro_data_de_nascimento":
        campo_alvo = campo_filtro_data_de_nascimento;
      break;
      case "cadastrar_data_de_nascimento":
        campo_alvo = campo_data_de_nascimento;
      break;
      case "editar_data_de_nascimento":
       campo_alvo = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_data_de_nascimento");
      break;
    }
    
    let dia = dia_selecionado;
    if(dia < 10){
      dia = "0" + dia;
    }
    
    let mes = parseInt(caixa_de_selecao_de_mes_do_calendario.value, 10);
    if(mes < 10){
      mes = "0" + mes;
    }
    
    const ano = parseInt(caixa_de_selecao_de_ano_do_calendario.value, 10);
    
    const valor = dia + "/" + mes + "/" + ano;
    if(campo_alvo !== null){
      campo_alvo.value = valor;
    }
    
    div_calendario.classList.add("tag_oculta");
  });
  
  function atualizando_botoes_de_radio_de_um_popup(id_da_div){
    const div_popup = document.getElementById(id_da_div);
    const botoes_de_radio = div_popup.querySelectorAll("input[type='radio'][checked='checked']");
    for(let i = 0; i < botoes_de_radio.length; i++){
      botoes_de_radio[i].checked = true;
    }
  }
  
  /* Ocultando popups */
  div_calendario.addEventListener("click", function(){
    ocultar_div_calendario = false;
  });
  
  document.addEventListener("click", function(){
    if(ocultar_div_calendario){
      div_calendario.classList.add("tag_oculta");
    }else{
      ocultar_div_calendario = true;
    }
  });
  
  /* Comportamento dos calendários quando a janela é redimensionada */
  window.addEventListener("resize", function(){
    if(!div_calendario.classList.contains("tag_oculta")){
      let posicao_x = 0;
      let posicao_y = 0;
      
      let campo_alvo = null;
      switch(alvo_do_calendario){
        case "filtro_data_de_nascimento":
          div_pagina_tudo_em_um.appendChild(div_calendario);
          campo_alvo = campo_filtro_data_de_nascimento;
          
          posicao_x += campo_alvo.getBoundingClientRect().left + window.scrollX;
          posicao_y += campo_alvo.getBoundingClientRect().top + window.scrollY;
        break;
        case "cadastrar_data_de_nascimento":
          div_tronco_do_popup_cadastrar_pessoa.appendChild(div_calendario);
          campo_alvo = campo_data_de_nascimento;
          
          var estilo_computado = window.getComputedStyle(div_tronco_do_popup_cadastrar_pessoa);
          posicao_x += parseInt(estilo_computado.paddingLeft, 10);
          
          posicao_y += campo_alvo.getBoundingClientRect().top;
          posicao_y -= div_tronco_do_popup_cadastrar_pessoa.getBoundingClientRect().top;
          posicao_y += div_tronco_do_popup_cadastrar_pessoa.scroll_y;
        break;
        case "editar_data_de_nascimento":
          const div_tronco_do_popup_editar_pessoa = div_parte_util_do_popup_editar_pessoa.querySelector(".div_tronco_do_popup_editar_pessoa");
          div_tronco_do_popup_editar_pessoa.appendChild(div_calendario);
          campo_alvo = div_parte_util_do_popup_editar_pessoa.querySelector(".campo_data_de_nascimento");
          
          var estilo_computado = window.getComputedStyle(div_tronco_do_popup_editar_pessoa);
          posicao_x += parseInt(estilo_computado.paddingLeft, 10);
          
          posicao_y += campo_alvo.getBoundingClientRect().top;
          posicao_y -= div_tronco_do_popup_editar_pessoa.getBoundingClientRect().top;
          posicao_y += div_tronco_do_popup_editar_pessoa.scroll_y;
        break;
      }
      
      var estilo_computado = window.getComputedStyle(campo_alvo);
      const largura_do_campo_alvo = parseInt(estilo_computado.width, 10);
      const altura_do_campo_alvo = parseInt(estilo_computado.height, 10);
      posicao_y += altura_do_campo_alvo;
      
      var estilo_computado = window.getComputedStyle(div_calendario);
      const largura_do_calendario = parseInt(estilo_computado.width, 10);
      var diferenca_de_larguras = largura_do_campo_alvo - largura_do_calendario;
      if(posicao_x + diferenca_de_larguras / 2 >= 0){
        posicao_x += diferenca_de_larguras / 2;
      }
      
      div_calendario.style.position = "absolute";
      div_calendario.style.top = posicao_y + "px";
      div_calendario.style.left = posicao_x + "px";
      if(window.innerWidth <= largura_do_calendario){
        div_calendario.style.left = "0px";
      }
    }
  });
});
