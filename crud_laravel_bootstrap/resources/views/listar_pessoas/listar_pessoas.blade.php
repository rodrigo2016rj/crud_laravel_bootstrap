@extends('template')

@section('head_especifico')
@vite(['resources/scripts/listar_pessoas.js'])
<link href='{{asset("css/$visual_escolhido_template/listar_pessoas.css")}}' type="text/css" rel="stylesheet"/>
<title>{{$nome_do_sistema_template}} - Listar Pessoas</title>
@endsection

@section('pagina_do_sistema')
<div id="div_pagina_listar_pessoas">
  <h2 id="h2_titulo_da_pagina" class="text-center">
    <span>Lista de Pessoas</span>
  </h2>
  <div id="div_opcoes_da_pagina">
    <h3 id="h3_titulo_das_opcoes_da_pagina">
      <span>Opções</span>
    </h3>
    <div id="div_lista_de_opcoes_da_pagina">
      <a id="link_cadastrar" class="opcao_da_pagina" href="/cadastrar_pessoa">Cadastrar Pessoa</a>
    </div>
  </div>
  <form id="form_filtros" method="get" action="/listar_pessoas">
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
        <input type="submit" id="botao_buscar" class="btn botao_basico btn-sm" value="Buscar"/>
        <input type="reset" id="botao_limpar" class="btn botao_basico btn-sm" value="Limpar"/>
      </div>
    </div>
  </form>
  <div id="div_local_da_lista_de_pessoas">
    <h3 id="h3_titulo_da_lista_de_pessoas">
      <span>Lista</span>
    </h3>
    @if ($lista_de_pessoas['pagina_atual'])
    <div id="div_paginacao_de_cima_da_lista_de_pessoas">
      @include ('listar_pessoas.paginacao_da_lista_de_pessoas')
    </div>
    @endif
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
      @include ('listar_pessoas.lista_de_pessoas')
    </div>
    @if ($lista_de_pessoas['pagina_atual'])
    <div id="div_paginacao_de_baixo_da_lista_de_pessoas">
      @include ('listar_pessoas.paginacao_da_lista_de_pessoas')
    </div>
    @endif
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
