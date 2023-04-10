@extends('template')

@section('head_especifico')
@vite(['resources/scripts/editar_pessoa.js'])
<link href='{{asset("css/$visual_escolhido_template/editar_pessoa.css")}}' type="text/css" rel="stylesheet"/>
<title>{{$nome_do_sistema_template}} - Editar Pessoa</title>
@endsection

@section('pagina_do_sistema')
<div id="div_pagina_editar_pessoa">
  <h2 id="h2_titulo_da_pagina" class="text-center">
    <span>Editar Pessoa</span>
  </h2>
  @if ($mensagem)
  <div id="div_mensagem">
    <span id="span_mensagem" class="mensagem_de_{{$tipo_de_mensagem}}">{{$mensagem}}</span>
  </div>
  @endif
  <form id="form_editar" method="post" action="/editar_pessoa/editar">
    <div id="div_legenda_do_form_editar">
      <span class="marcador_de_obrigatoriedade">*</span>
      <span>Indica que o campo é de preenchimento obrigatório.</span>
    </div>
    <div id="div_editar_nome" class="parte_do_formulario">
      <div id="div_label_nome">
        <label id="label_nome" class="form-label" for="campo_nome">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Nome</span>
        </label>
      </div>
      <div id="div_campo_nome">
        <input type="text" id="campo_nome" class="form-control" name="nome" value="{{$nome}}" 
               autocomplete="off"/>
      </div>
    </div>
    <div id="div_editar_sobrenome" class="parte_do_formulario">
      <div id="div_label_sobrenome">
        <label id="label_sobrenome" class="form-label" for="campo_sobrenome">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Sobrenome</span>
        </label>
      </div>
      <div id="div_campo_sobrenome">
        <input type="text" id="campo_sobrenome" class="form-control" name="sobrenome" 
               value="{{$sobrenome}}" autocomplete="off"/>
      </div>
    </div>
    <div id="div_editar_cpf" class="parte_do_formulario">
      <div id="div_label_cpf">
        <label id="label_cpf" class="form-label" for="campo_cpf">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>CPF</span>
        </label>
      </div>
      <div id="div_campo_cpf">
        <input type="text" id="campo_cpf" class="form-control" name="cpf" value="{{$cpf}}" 
               autocomplete="off"/>
      </div>
    </div>
    <div id="div_editar_data_de_nascimento" class="parte_do_formulario">
      <div id="div_label_data_de_nascimento">
        <label id="label_data_de_nascimento" class="form-label" for="campo_data_de_nascimento">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Data de nascimento</span>
        </label>
      </div>
      <div id="div_campo_data_de_nascimento">
        <input type="text" id="campo_data_de_nascimento" class="form-control" 
               name="data_de_nascimento" value="{{$data_de_nascimento}}" autocomplete="off"/>
        <span id="span_icone_de_calendario_do_campo_data_de_nascimento"></span>
      </div>
    </div>
    <div id="div_editar_sexo" class="parte_do_formulario">
      <div id="div_label_lista_de_sexos">
        <label id="label_lista_de_sexos" class="form-label">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Sexo</span>
        </label>
      </div>
      <div id="div_lista_de_sexos" class="form-check">
      @foreach ($sexos as $chave => $valor)
      <label class="item_da_lista_de_sexos form-check-label">
        @if ($chave === $sexo)
        <input class="form-check-input" type="radio" name="sexo" value="{{$chave}}" 
               checked="checked" autocomplete="off"/>
        <span>{{$valor}}</span>
        @else
        <input class="form-check-input" type="radio" name="sexo" value="{{$chave}}" 
               autocomplete="off"/>
        <span>{{$valor}}</span>
        @endif
      </label>
      @endforeach
      </div>
    </div>
    <div id="div_editar_setor" class="parte_do_formulario">
      <div id="div_label_setor">
        <label id="label_setor" class="form-label" for="caixa_de_selecao_setor">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Setor</span>
        </label>
      </div>
      <div id="div_caixa_de_selecao_setor">
        <select id="caixa_de_selecao_setor" class="form-select" name="id_do_setor" autocomplete="off">
          <option value="">Selecione</option>
          @foreach ($setores as $setor)
            @if ($setor['id'] == $id_do_setor)
            <option value="{{$setor['id']}}" selected="selected">{{$setor['nome']}}</option>
            @else
            <option value="{{$setor['id']}}">{{$setor['nome']}}</option>
            @endif
          @endforeach
        </select>
      </div>
    </div>
    <div id="div_editar_email" class="parte_do_formulario">
      <div id="div_label_email">
        <label id="label_email" class="form-label" for="campo_email">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>E-mail</span>
        </label>
      </div>
      <div id="div_campo_email">
        <input type="text" id="campo_email" class="form-control" name="email" value="{{$email}}" 
               autocomplete="off"/>
      </div>
    </div>
    <div id="div_editar_telefone_fixo" class="parte_do_formulario">
      <div id="div_label_telefone_fixo">
        <label id="label_telefone_fixo" class="form-label" for="campo_telefone_fixo">
          <span>Número do telefone fixo</span>
        </label>
      </div>
      <div id="div_campo_telefone_fixo">
        <input type="text" id="campo_telefone_fixo" class="form-control" name="telefone_fixo" 
               value="{{$telefone_fixo}}" autocomplete="off"/>
      </div>
    </div>
    <div id="div_editar_telefone_movel" class="parte_do_formulario">
      <div id="div_label_telefone_movel">
        <label id="label_telefone_movel" class="form-label" for="campo_telefone_movel">
          <span>Número de celular</span>
        </label>
      </div>
      <div id="div_campo_telefone_movel">
        <input type="text" id="campo_telefone_movel" class="form-control" name="telefone_movel" 
               value="{{$telefone_movel}}" autocomplete="off"/>
      </div>
    </div>
    <div id="div_editar_telefone_estrangeiro" class="parte_do_formulario">
      <div id="div_label_telefone_estrangeiro">
        <label id="label_telefone_estrangeiro" class="form-label" for="campo_telefone_estrangeiro">
          <span>Número para contato no exterior</span>
        </label>
      </div>
      <div id="div_campo_telefone_estrangeiro">
        <input type="text" id="campo_telefone_estrangeiro" class="form-control" 
               name="telefone_estrangeiro" value="{{$telefone_estrangeiro}}" autocomplete="off"/>
      </div>
    </div>
    <div id="div_botao_editar" class="parte_do_formulario text-center">
      @csrf
      <input type="hidden" id="campo_id_da_pessoa" name="id_da_pessoa" value="{{$id_da_pessoa}}"/>
      <input type="submit" id="botao_editar" class="btn botao_basico btn-sm" value="Editar"/>
    </div>
  </form>
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
  <div id="div_descricoes_dos_setores" class="tag_oculta">
    @foreach ($setores as $setor)
      <div id="div_descricao_do_setor_id_{{$setor['id']}}" class="tag_oculta">
        <span>{{$setor["descricao"]}}</span>
      </div>
    @endforeach
  </div>
</div>
@endsection
