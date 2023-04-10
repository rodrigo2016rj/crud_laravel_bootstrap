@foreach ($lista_de_pessoas['pessoas'] as $pessoa)
@if ($loop->odd)
<div class="pessoa impar row row-cols-1 row-cols-md-12 gy-4 gy-sm-3 gy-md-0 align-items-center">
@else
<div class="pessoa par row row-cols-1 row-cols-md-12 gy-4 gy-sm-3 gy-md-0 align-items-center">
@endif
  <div class="local_do_nome_da_pessoa col-md-3">
    <a href="pessoa?id={{$pessoa['id']}}" class="nome_da_pessoa" 
       title="Acessar a página de {{$pessoa['nome_completo']}}">{{$pessoa['nome_completo']}}</a>
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
  </div>
</div>
@endforeach
@if (empty($lista_de_pessoas['pessoas']))
<div id="div_mensagem_quando_nao_ha_pessoas">
  <span id="span_mensagem_quando_nao_ha_pessoas">Nenhuma pessoa foi encontrada, limpe os filtros ou busque por outras informações.</span>
</div>
@endif