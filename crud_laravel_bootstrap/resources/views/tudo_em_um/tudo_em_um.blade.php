@extends('template')

@section('head_especifico')
@vite(['resources/scripts/tudo_em_um.js'])
<link href='{{asset("css/$visual_escolhido_template/tudo_em_um.css")}}' type="text/css" rel="stylesheet"/>
<title>{{$nome_do_sistema_template}} - Tudo em um</title>
@endsection

@section('pagina_do_sistema')
<div id="div_pagina_tudo_em_um">
  <h2 id="h2_titulo_da_pagina" class="text-center">
    <span>Tudo em um</span>
  </h2>
  <div id="div_opcoes_da_pagina">
    <h3 id="h3_titulo_das_opcoes_da_pagina">
      <span>Opções</span>
    </h3>
    <div id="div_lista_de_opcoes_da_pagina">
      <a id="link_cadastrar_pessoa" class="opcao_da_pagina" data-bs-toggle="modal" 
         data-bs-target="#div_cadastrar_pessoa" href="/cadastrar_pessoa">Cadastrar Pessoa</a>
    </div>
  </div>
  <div id="div_filtros">
    <h3 id="h3_titulo_dos_filtros">
      <span>Buscar</span>
    </h3>
    <div id="div_partes_do_formulario_de_filtros" class="row gy-0 row-cols-1 row-cols-sm-2 row-cols-md-3">
      <div id="div_filtro_nome" class="parte_do_formulario col">
        <div id="div_label_filtro_nome">
          <label id="label_filtro_nome" class="form-label" for="campo_filtro_nome">
            <span>Nome</span>
          </label>
        </div>
        <div id="div_campo_filtro_nome">
          <input type="text" id="campo_filtro_nome" class="form-control" name="filtro_nome" 
                 value="{{$lista_de_pessoas['filtro_nome']}}" autocomplete="off" 
                 placeholder="Parte do nome"/>
        </div>
      </div>
      <div id="div_filtro_cpf" class="parte_do_formulario col">
        <div id="div_label_filtro_cpf">
          <label id="label_filtro_cpf" class="form-label" for="campo_filtro_cpf">
            <span>CPF</span>
          </label>
        </div>
        <div id="div_campo_filtro_cpf">
          <input type="text" id="campo_filtro_cpf" class="form-control" name="filtro_cpf" 
                 value="{{$lista_de_pessoas['filtro_cpf']}}" autocomplete="off" 
                 placeholder="CPF completo"/>
        </div>
      </div>
      <div id="div_filtro_data_de_nascimento" class="parte_do_formulario col">
        <div id="div_label_filtro_data_de_nascimento">
          <label id="label_filtro_data_de_nascimento" class="form-label" 
                 for="campo_filtro_data_de_nascimento">
            <span>Data de nascimento</span>
          </label>
        </div>
        <div id="div_campo_filtro_data_de_nascimento">
          <input type="text" id="campo_filtro_data_de_nascimento" class="form-control" 
                 name="filtro_data_de_nascimento" placeholder="dia/mês/ano" 
                 value="{{$lista_de_pessoas['filtro_data_de_nascimento']}}" autocomplete="off"/>
          <span id="span_icone_de_calendario_do_campo_filtro_data_de_nascimento"></span>
        </div>
      </div>
      <div id="div_filtro_setor" class="parte_do_formulario col">
        <div id="div_label_filtro_setor">
          <label id="label_filtro_setor" class="form-label" for="caixa_de_selecao_filtro_setor">
            <span>Setor</span>
          </label>
        </div>
        <div id="div_caixa_de_selecao_filtro_setor">
          <select id="caixa_de_selecao_filtro_setor" class="form-select" name="filtro_id_do_setor" 
                  autocomplete="off">
            <option value="">Selecione</option>
            @foreach ($setores as $setor)
              @if ($setor['id'] == $lista_de_pessoas['filtro_id_do_setor'])
              <option value="{{$setor['id']}}" selected="selected">{{$setor['nome']}}</option>
              @else
              <option value="{{$setor['id']}}">{{$setor['nome']}}</option>
              @endif
            @endforeach
          </select>
        </div>
      </div>
      <div id="div_quantidade_por_pagina" class="parte_do_formulario col">
        <div id="div_label_quantidade_por_pagina">
          <label id="label_quantidade_por_pagina" class="form-label" 
                 for="caixa_de_selecao_quantidade_por_pagina">
            <span>Quantidade por página</span>
          </label>
        </div>
        <div id="div_caixa_de_selecao_quantidade_por_pagina">
          <select id="caixa_de_selecao_quantidade_por_pagina" class="form-select" 
                  name="quantidade_por_pagina" autocomplete="off">
            @foreach ($quantidades_por_pagina as $chave => $valor)
              @if ($chave === $lista_de_pessoas['quantidade_por_pagina'])
              <option value="{{$chave}}" selected="selected">{{$valor}}</option>
              @else
              <option value="{{$chave}}">{{$valor}}</option>
              @endif
            @endforeach
          </select>
        </div>
      </div>
      <div id="div_botoes_dos_filtros" class="parte_do_formulario col d-flex align-items-end">
        <input type="hidden" id="campo_ordenacao" name="ordenacao" 
               value="{{$lista_de_pessoas['ordenacao']}}"/>
        <button type="button" id="botao_buscar" class="btn botao_basico btn-sm">Buscar</button>
        <button type="button" id="botao_limpar" class="btn botao_basico btn-sm">Limpar</button>
      </div>
    </div>
  </div>
  <div id="div_local_da_lista_de_pessoas">
    <h3 id="h3_titulo_da_lista_de_pessoas">
      <span id="span_titulo_da_lista_de_pessoas">Lista</span>
      <span id="span_status_da_busca_animado" class="tag_oculta spinner-border text-primary" 
            role="status">
        <span class="visually-hidden">Aguarde...</span>
      </span>
      <span id="span_status_da_busca" class="tag_oculta"></span>
    </h3>
    <div id="div_paginacao_de_cima_da_lista_de_pessoas">
    @if ($lista_de_pessoas['pagina_atual'])
      @include ('tudo_em_um.paginacao_da_lista_de_pessoas')
    @endif
    </div>
    <div id="div_partes_da_lista_de_pessoas" class="row px-2 px-md-0 gx-0 gx-md-4">
      <div id="div_parte_nome_da_lista_de_pessoas" class="parte_da_lista col col-md-3">
        <span>Nome</span>
        <br class="d-md-none"/>
        <span>{{$lista_de_pessoas['ordem_do_nome']}}</span>
      </div>
      <div id="div_parte_cpf_da_lista_de_pessoas" class="parte_da_lista col col-md-2">
        <span>CPF</span>
        <br class="d-md-none"/>
        <span>{{$lista_de_pessoas['ordem_do_cpf']}}</span>
      </div>
      <div id="div_parte_setor_da_lista_de_pessoas" class="parte_da_lista col col-md-2">
        <span>Setor</span>
        <br class="d-md-none"/>
        <span>{{$lista_de_pessoas['ordem_do_setor']}}</span>
      </div>
      <div id="div_parte_contato_da_lista_de_pessoas" class="parte_da_lista col col-md-3">
        <span>Contato</span>
        <br class="d-md-none"/>
        <span>{{$lista_de_pessoas['ordem_do_contato']}}</span>
      </div>
      <div id="div_parte_opcoes_da_lista_de_pessoas" class="parte_da_lista d-none d-md-block col-md-2">
        <span>Opções</span>
      </div>
    </div>
    <div id="div_lista_de_pessoas">
      @include ('tudo_em_um.lista_de_pessoas')
    </div>
    <div id="div_paginacao_de_baixo_da_lista_de_pessoas">
    @if ($lista_de_pessoas['pagina_atual'])
      @include ('tudo_em_um.paginacao_da_lista_de_pessoas')
    @endif
    </div>
  </div>
  <div id="div_cadastrar_pessoa" class="modal fade" tabindex="-1" aria-hidden="true" 
       aria-labelledby="h3_titulo_cadastrar_pessoa">
    <div id="div_parte_total_do_popup_cadastrar_pessoa" class="modal-dialog modal-dialog-scrollable">
      <div id="div_parte_util_do_popup_cadastrar_pessoa" class="modal-content">
        <div id="div_cabecalho_do_popup_cadastrar_pessoa" class="modal-header">
          <h3 id="h3_titulo_cadastrar_pessoa" class="modal-title">
            <span>Cadastrar Pessoa</span>
          </h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div id="div_tronco_do_popup_cadastrar_pessoa" class="modal-body">
          <div id="div_legenda_do_formulario_cadastrar_pessoa">
            <span class="marcador_de_obrigatoriedade">*</span>
            <span>Indica que o campo é de preenchimento obrigatório.</span>
          </div>
          <div id="div_cadastrar_nome" class="parte_do_formulario">
            <div id="div_label_nome">
              <label id="label_nome" class="form-label" for="campo_nome">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>Nome</span>
              </label>
            </div>
            <div id="div_campo_nome">
              <input type="text" id="campo_nome" class="form-control" name="nome" autocomplete="off"/>
            </div>
          </div>
          <div id="div_cadastrar_sobrenome" class="parte_do_formulario">
            <div id="div_label_sobrenome">
              <label id="label_sobrenome" class="form-label" for="campo_sobrenome">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>Sobrenome</span>
              </label>
            </div>
            <div id="div_campo_sobrenome">
              <input type="text" id="campo_sobrenome" class="form-control" name="sobrenome" 
                     autocomplete="off"/>
            </div>
          </div>
          <div id="div_cadastrar_cpf" class="parte_do_formulario">
            <div id="div_label_cpf">
              <label id="label_cpf" class="form-label" for="campo_cpf">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>CPF</span>
              </label>
            </div>
            <div id="div_campo_cpf">
              <input type="text" id="campo_cpf" class="form-control" name="cpf" autocomplete="off"/>
            </div>
          </div>
          <div id="div_cadastrar_data_de_nascimento" class="parte_do_formulario">
            <div id="div_label_data_de_nascimento">
              <label id="label_data_de_nascimento" class="form-label" for="campo_data_de_nascimento">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>Data de nascimento</span>
              </label>
            </div>
            <div id="div_campo_data_de_nascimento">
              <input type="text" id="campo_data_de_nascimento" class="form-control" 
                     name="data_de_nascimento" autocomplete="off"/>
              <span id="span_icone_de_calendario_do_campo_data_de_nascimento"></span>
            </div>
          </div>
          <div id="div_cadastrar_sexo" class="parte_do_formulario">
            <div id="div_label_lista_de_sexos">
              <label id="label_lista_de_sexos" class="form-label">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>Sexo</span>
              </label>
            </div>
            <div id="div_lista_de_sexos" class="form-check">
            @foreach ($sexos as $chave => $valor)
            <label class="item_da_lista_de_sexos form-check-label">
              <input type="radio" class="form-check-input" name="sexo" value="{{$chave}}" 
                     autocomplete="off"/>
              <span>{{$valor}}</span>
            </label>
            @endforeach
            </div>
          </div>
          <div id="div_cadastrar_setor" class="parte_do_formulario">
            <div id="div_label_setor">
              <label id="label_setor" class="form-label" for="caixa_de_selecao_setor">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>Setor</span>
              </label>
            </div>
            <div id="div_caixa_de_selecao_setor">
              <select id="caixa_de_selecao_setor" class="form-select" name="id_do_setor" 
                      autocomplete="off">
                <option value="">Selecione</option>
                @foreach ($setores as $setor)
                  <option value="{{$setor['id']}}">{{$setor['nome']}}</option>
                @endforeach
              </select>
            </div>
          </div>
          <div id="div_cadastrar_email" class="parte_do_formulario">
            <div id="div_label_email">
              <label id="label_email" class="form-label" for="campo_email">
                <span class="marcador_de_obrigatoriedade">*</span>
                <span>E-mail</span>
              </label>
            </div>
            <div id="div_campo_email">
              <input type="text" id="campo_email" class="form-control" name="email" autocomplete="off"/>
            </div>
          </div>
          <div id="div_cadastrar_telefone_fixo" class="parte_do_formulario">
            <div id="div_label_telefone_fixo">
              <label id="label_telefone_fixo" class="form-label" for="campo_telefone_fixo">
                <span>Número do telefone fixo</span>
              </label>
            </div>
            <div id="div_campo_telefone_fixo">
              <input type="text" id="campo_telefone_fixo" class="form-control" name="telefone_fixo" 
                     autocomplete="off"/>
            </div>
          </div>
          <div id="div_cadastrar_telefone_movel" class="parte_do_formulario">
            <div id="div_label_telefone_movel">
              <label id="label_telefone_movel" class="form-label" for="campo_telefone_movel">
                <span>Número de celular</span>
              </label>
            </div>
            <div id="div_campo_telefone_movel">
              <input type="text" id="campo_telefone_movel" class="form-control" name="telefone_movel" 
                     autocomplete="off"/>
            </div>
          </div>
          <div id="div_cadastrar_telefone_estrangeiro" class="parte_do_formulario">
            <div id="div_label_telefone_estrangeiro">
              <label id="label_telefone_estrangeiro" class="form-label" for="campo_telefone_estrangeiro">
                <span>Número para contato no exterior</span>
              </label>
            </div>
            <div id="div_campo_telefone_estrangeiro">
              <input type="text" id="campo_telefone_estrangeiro" class="form-control" 
                     name="telefone_estrangeiro" autocomplete="off"/>
            </div>
          </div>
        </div>
        <div id="div_rodape_do_popup_cadastrar_pessoa" class="modal-footer">
          <div id="div_mensagem_cadastrar_pessoa" class="div_mensagem tag_oculta">
            <span id="span_status_cadastrar_pessoa_animado" 
                  class="tag_oculta spinner-border text-primary" role="status"></span>
            <span id="span_mensagem_cadastrar_pessoa"></span>
          </div>
          <div id="div_botao_cadastrar" class="parte_do_formulario">
            @csrf
            <button type="button" id="botao_cadastrar" class="btn botao_basico btn-sm">Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="div_visualizar_pessoa" class="modal fade" tabindex="-1" aria-hidden="true">
    <div id="div_parte_total_do_popup_visualizar_pessoa" class="modal-dialog modal-dialog-scrollable">
      <div id="div_parte_util_do_popup_visualizar_pessoa" class="modal-content">
      </div>
    </div>
  </div>
  <div id="div_editar_pessoa" class="modal fade" tabindex="-1" aria-hidden="true">
    <div id="div_parte_total_do_popup_editar_pessoa" class="modal-dialog modal-dialog-scrollable">
      <div id="div_parte_util_do_popup_editar_pessoa" class="modal-content">
      </div>
    </div>
  </div>
  <div id="div_excluir_pessoa" class="modal fade" tabindex="-1" aria-hidden="true">
    <div id="div_parte_total_do_popup_excluir_pessoa" class="modal-dialog modal-dialog-scrollable">
      <div id="div_parte_util_do_popup_excluir_pessoa" class="modal-content">
      </div>
    </div>
  </div>
  <div id="div_calendario" class="tag_oculta">
    <div id="div_cabecalho_do_calendario">
      <span id="span_titulo_do_calendario">Calendário</span>
      <select id="caixa_de_selecao_de_mes_do_calendario" class="form-select form-select-sm" 
              autocomplete="off">
        <option class="opcao_mes" value="1">Janeiro</option>
        <option class="opcao_mes" value="2">Fevereiro</option>
        <option class="opcao_mes" value="3">Março</option>
        <option class="opcao_mes" value="4">Abril</option>
        <option class="opcao_mes" value="5">Maio</option>
        <option class="opcao_mes" value="6">Junho</option>
        <option class="opcao_mes" value="7">Julho</option>
        <option class="opcao_mes" value="8">Agosto</option>
        <option class="opcao_mes" value="9">Setembro</option>
        <option class="opcao_mes" value="10">Outubro</option>
        <option class="opcao_mes" value="11">Novembro</option>
        <option class="opcao_mes" value="12">Dezembro</option>
      </select>
      <select id="caixa_de_selecao_de_ano_do_calendario" class="form-select form-select-sm" 
              autocomplete="off">
      </select>
    </div>
    <div id="div_corpo_do_calendario">
      <div id="div_dias_do_calendario">
        <div class="celula_do_calendario">
          <span>Dom</span>
        </div>
        <div class="celula_do_calendario">
          <span>Seg</span>
        </div>
        <div class="celula_do_calendario">
          <span>Ter</span>
        </div>
        <div class="celula_do_calendario">
          <span>Qua</span>
        </div>
        <div class="celula_do_calendario">
          <span>Qui</span>
        </div>
        <div class="celula_do_calendario">
          <span>Sex</span>
        </div>
        <div class="celula_do_calendario">
          <span>Sáb</span>
        </div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
        <div class="celula_do_calendario"></div>
      </div>
    </div>
    <div id="div_rodape_do_calendario">
      <div id="div_botoes_do_calendario">
        <button type="button" id="botao_confirmar_do_calendario" 
                class="btn botao_basico btn-sm">Confirmar</button>
      </div>
    </div>
  </div>
</div>
@endsection
