@foreach ($lista_de_pessoas['pessoas'] as $pessoa)
@if ($loop->odd)
<div class="pessoa impar row row-cols-1 row-cols-md-12 gy-4 gy-sm-3 gy-md-0 align-items-center">
@else
<div class="pessoa par row row-cols-1 row-cols-md-12 gy-4 gy-sm-3 gy-md-0 align-items-center">
@endif
  <div class="local_do_nome_da_pessoa col-md-3">
    <a href="pessoa?id={{$pessoa['id']}}" class="nome_da_pessoa" title="Visualizar">{{$pessoa['nome_completo']}}</a>
    <div id="div_visualizar_pessoa_do_id_{{$pessoa['id']}}" class="div_visualizar_pessoa tag_oculta">
      <div class="div_cabecalho_do_popup_visualizar_pessoa modal-header">
        <h3 id="h3_titulo_visualizar_pessoa_do_id_{{$pessoa['id']}}" 
            class="h3_titulo_visualizar_pessoa modal-title">
          <span>Informações</span>
        </h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="div_tronco_do_popup_visualizar_pessoa modal-body">
        <div class="div_visualizar_nome_completo informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Nome:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['nome_completo']}}</span>
          </div>
        </div>
        <div class="div_visualizar_cpf informacao_da_pessoa">
          <span class="parte_generica_da_informacao">CPF:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['cpf']}}</span>
          </div>
        </div>
        <div class="div_visualizar_data_de_nascimento informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Data de nascimento:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['data_de_nascimento']}}</span>
          </div>
        </div>
        <div class="div_visualizar_idade informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Idade:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['idade']}}</span>
          </div>
        </div>
        <div class="div_visualizar_sexo informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Sexo:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao {{$pessoa['sexo_classe_css']}}">{{$sexos[$pessoa['sexo']]}}</span>
          </div>
        </div>
        <div class="div_visualizar_setor informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Setor:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['nome_do_setor']}}</span>
          </div>
        </div>
        <div class="div_visualizar_email informacao_da_pessoa">
          <span class="parte_generica_da_informacao">E-mail:</span>
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['email']}}</span>
          </div>
        </div>
        <div class="div_visualizar_telefone_fixo informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Número do telefone fixo:</span>
          @if ($pessoa['telefone_fixo'])
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['telefone_fixo']}}</span>
          </div>
          @else
          <div class="local_da_parte_especifica_da_informacao">
            <span class="sem_informacao">Não informado</span>
          </div>
          @endif
        </div>
        <div class="div_visualizar_telefone_movel informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Número de celular:</span>
          @if ($pessoa['telefone_movel'])
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['telefone_movel']}}</span>
          </div>
          @else
          <div class="local_da_parte_especifica_da_informacao">
            <span class="sem_informacao">Não informado</span>
          </div>
          @endif
        </div>
        <div class="div_visualizar_telefone_estrangeiro informacao_da_pessoa">
          <span class="parte_generica_da_informacao">Número para contato no exterior:</span>
          @if ($pessoa['telefone_estrangeiro'])
          <div class="local_da_parte_especifica_da_informacao">
            <span class="parte_especifica_da_informacao">{{$pessoa['telefone_estrangeiro']}}</span>
          </div>
          @else
          <div class="local_da_parte_especifica_da_informacao">
            <span class="sem_informacao">Não informado</span>
          </div>
          @endif
        </div>
      </div>
    </div>
  </div>
  <div class="local_do_cpf_da_pessoa col-md-2">
    <span class="cpf_da_pessoa">{{$pessoa['cpf']}}</span>
  </div>
  <div class="local_do_nome_do_setor col-md-2">
    <span class="nome_do_setor">{!! $pessoa['nome_do_setor_com_quebra_de_linha'] !!}</span>
  </div>
  <div class="local_do_contato_da_pessoa col-md-3">
    <div class="contato_da_pessoa">
      <span class="email_da_pessoa">{{$pessoa['email']}}</span>
    </div>
    @if ($pessoa['telefone_fixo'])
    <div class="contato_da_pessoa">
      <span class="telefone_fixo_da_pessoa">{{$pessoa['telefone_fixo']}}</span>
    </div>
    @endif
    @if ($pessoa['telefone_movel'])
    <div class="contato_da_pessoa">
      <span class="telefone_movel_da_pessoa">{{$pessoa['telefone_movel']}}</span>
    </div>
    @endif
    @if ($pessoa['telefone_estrangeiro'])
    <div class="contato_da_pessoa">
      <span class="telefone_estrangeiro_da_pessoa">{{$pessoa['telefone_estrangeiro']}}</span>
    </div>
    @endif
  </div>
  <div class="local_das_opcoes_do_item_da_lista col-md-2 d-flex justify-content-md-end align-items-center">
    <div class="opcao_do_item_da_lista">
      <a href="editar_pessoa?id={{$pessoa['id']}}" class="link_editar_pessoa" title="Editar"></a>
    </div>
    <div class="opcao_do_item_da_lista">
      <a href="excluir_pessoa?id={{$pessoa['id']}}" class="link_excluir_pessoa" title="Excluir"></a>
    </div>
    <div id="div_editar_pessoa_do_id_{{$pessoa['id']}}" class="div_editar_pessoa tag_oculta">
      <div class="div_cabecalho_do_popup_editar_pessoa modal-header">
        <h3 id="h3_titulo_editar_pessoa_do_id_{{$pessoa['id']}}" 
            class="h3_titulo_editar_pessoa modal-title">
          <span>Editar Pessoa</span>
        </h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="div_tronco_do_popup_editar_pessoa modal-body">
        <div class="div_legenda_do_formulario_editar_pessoa">
          <span class="marcador_de_obrigatoriedade">*</span>
          <span>Indica que o campo é de preenchimento obrigatório.</span>
        </div>
        <div class="div_editar_nome parte_do_formulario">
          <div class="div_label_nome">
            <label class="label_nome form-label" for="campo_nome">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Nome</span>
            </label>
          </div>
          <div class="div_campo_nome">
            <input type="text" class="campo_nome form-control" name="nome" value="{{$pessoa['nome']}}" 
                   autocomplete="off"/>
          </div>
        </div>
        <div class="div_editar_sobrenome parte_do_formulario">
          <div class="div_label_sobrenome">
            <label class="label_sobrenome form-label" for="campo_sobrenome">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Sobrenome</span>
            </label>
          </div>
          <div class="div_campo_sobrenome">
            <input type="text" class="campo_sobrenome form-control" name="sobrenome" 
                   value="{{$pessoa['sobrenome']}}" autocomplete="off"/>
          </div>
        </div>
        <div class="div_editar_cpf parte_do_formulario">
          <div class="div_label_cpf">
            <label class="label_cpf form-label" for="campo_cpf">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>CPF</span>
            </label>
          </div>
          <div class="div_campo_cpf">
            <input type="text" class="campo_cpf form-control" name="cpf" value="{{$pessoa['cpf']}}" 
                   autocomplete="off"/>
          </div>
        </div>
        <div class="div_editar_data_de_nascimento parte_do_formulario">
          <div class="div_label_data_de_nascimento">
            <label class="label_data_de_nascimento form-label" for="campo_data_de_nascimento">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Data de nascimento</span>
            </label>
          </div>
          <div class="div_campo_data_de_nascimento">
            <input type="text" class="campo_data_de_nascimento form-control" name="data_de_nascimento" 
                   value="{{$pessoa['data_de_nascimento']}}" autocomplete="off"/>
            <span class="span_icone_de_calendario_do_campo_data_de_nascimento"></span>
          </div>
        </div>
        <div class="div_editar_sexo parte_do_formulario">
          <div class="div_label_lista_de_sexos">
            <label class="label_lista_de_sexos form-label">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Sexo</span>
            </label>
          </div>
          <div class="div_lista_de_sexos form-check">
          @foreach ($sexos as $chave => $valor)
          <label class="item_da_lista_de_sexos form-check-label">
            @if ($chave === $pessoa['sexo'])
            <input type="radio" class="form-check-input" name="sexo_da_pessoa_do_id_{{$pessoa['id']}}" 
                   value="{{$chave}}" checked="checked" autocomplete="off"/>
            <span>{{$valor}}</span>
            @else
            <input type="radio" class="form-check-input" name="sexo_da_pessoa_do_id_{{$pessoa['id']}}" 
                   value="{{$chave}}" autocomplete="off"/>
            <span>{{$valor}}</span>
            @endif
          </label>
          @endforeach
          </div>
        </div>
        <div class="div_editar_setor parte_do_formulario">
          <div class="div_label_setor">
            <label class="label_setor form-label" for="caixa_de_selecao_setor">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>Setor</span>
            </label>
          </div>
          <div class="div_caixa_de_selecao_setor">
            <select class="caixa_de_selecao_setor form-select" name="id_do_setor" autocomplete="off">
              <option value="">Selecione</option>
              @foreach ($setores as $setor)
                @if ($setor['id'] == $pessoa['id_do_setor'])
                <option value="{{$setor['id']}}" selected="selected">{{$setor['nome']}}</option>
                @else
                <option value="{{$setor['id']}}">{{$setor['nome']}}</option>
                @endif
              @endforeach
            </select>
          </div>
        </div>
        <div class="div_editar_email parte_do_formulario">
          <div class="div_label_email">
            <label class="label_email form-label" for="campo_email">
              <span class="marcador_de_obrigatoriedade">*</span>
              <span>E-mail</span>
            </label>
          </div>
          <div class="div_campo_email">
            <input type="text" class="campo_email form-control" name="email" 
                   value="{{$pessoa['email']}}" autocomplete="off"/>
          </div>
        </div>
        <div class="div_editar_telefone_fixo parte_do_formulario">
          <div class="div_label_telefone_fixo">
            <label class="label_telefone_fixo form-label" for="campo_telefone_fixo">
              <span>Número do telefone fixo</span>
            </label>
          </div>
          <div class="div_campo_telefone_fixo">
            <input type="text" class="campo_telefone_fixo form-control" name="telefone_fixo" 
                   value="{{$pessoa['telefone_fixo']}}" autocomplete="off"/>
          </div>
        </div>
        <div class="div_editar_telefone_movel parte_do_formulario">
          <div class="div_label_telefone_movel">
            <label class="label_telefone_movel form-label" for="campo_telefone_movel">
              <span>Número de celular</span>
            </label>
          </div>
          <div class="div_campo_telefone_movel">
            <input type="text" class="campo_telefone_movel form-control" name="telefone_movel" 
                   value="{{$pessoa['telefone_movel']}}" autocomplete="off"/>
          </div>
        </div>
        <div class="div_editar_telefone_estrangeiro parte_do_formulario">
          <div class="div_label_telefone_estrangeiro">
            <label class="label_telefone_estrangeiro form-label" for="campo_telefone_estrangeiro">
              <span>Número para contato no exterior</span>
            </label>
          </div>
          <div class="div_campo_telefone_estrangeiro">
            <input type="text" class="campo_telefone_estrangeiro form-control" 
                   name="telefone_estrangeiro" value="{{$pessoa['telefone_estrangeiro']}}" 
                   autocomplete="off"/>
          </div>
        </div>
      </div>
      <div class="div_rodape_do_popup_editar_pessoa modal-footer">
        <div class="div_mensagem tag_oculta">
          <span class="span_status_editar_pessoa_animado tag_oculta spinner-border text-primary" 
                role="status"></span>
          <span class="span_mensagem_editar_pessoa"></span>
        </div>
        <div class="div_botao_editar parte_do_formulario">
          @csrf
          <input type="hidden" class="campo_id_da_pessoa" name="id_da_pessoa" value="{{$pessoa['id']}}"/>
          <button type="button" class="btn botao_editar btn-sm">Editar</button>
        </div>
      </div>
    </div>
    <div id="div_excluir_pessoa_do_id_{{$pessoa['id']}}" class="div_excluir_pessoa tag_oculta">
      <div class="div_cabecalho_do_popup_excluir_pessoa modal-header">
        <h3 id="h3_titulo_excluir_pessoa_do_id_{{$pessoa['id']}}" 
            class="h3_titulo_excluir_pessoa modal-title">
          <span>Excluir Pessoa</span>
        </h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="div_tronco_do_popup_excluir_pessoa modal-body">
        <div class="div_texto_confirmar_exclusao_de_pessoa">
          <span>
            Tem certeza que você deseja excluir definitivamente, do banco de dados deste 
            sistema, {{$pessoa['nome_completo']}}, CPF {{$pessoa['cpf']}}, cujo setor é o 
            {{$pessoa['nome_do_setor']}}?
          </span>
        </div>
      </div>
      <div class="div_rodape_do_popup_excluir_pessoa modal-footer">
        <div class="div_mensagem tag_oculta">
          <span class="span_status_excluir_pessoa_animado tag_oculta spinner-border text-primary" 
                role="status"></span>
          <span class="span_mensagem_excluir_pessoa"></span>
        </div>
        <div class="div_botao_excluir">
          @csrf
          <input type="hidden" class="campo_id_da_pessoa" name="id_da_pessoa" value="{{$pessoa['id']}}"/>
          <button type="button" class="btn botao_excluir btn-sm">Excluir Pessoa</button>
        </div>
      </div>
    </div>
  </div>
</div>
@endforeach
@if (empty($lista_de_pessoas['pessoas']))
<div id="div_mensagem_quando_nao_ha_pessoas">
  <span id="span_mensagem_quando_nao_ha_pessoas">Nenhuma pessoa foi encontrada, limpe os filtros ou busque por outras informações.</span>
</div>
@endif