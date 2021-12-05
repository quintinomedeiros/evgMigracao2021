
var questoes_json = '{ "questoes": [ { "id": 1, "pergunta": "No evento que você vai realizar  terá hasteamentos de 3 bandeiras: a do Brasil, do Estado e do Município. A colocação correta da bandeira do Brasil será:", "opcao1": "a) A bandeira nacional ficará no meio com altura mais baixa que as outras.", "opcao2": "b) A bandeira do estado ficará no meio porque o evento é na capital do Estado.", "opcao3": "c) A bandeira do Distrito Federal ficará á esquerda da bandeira nacional.", "opcao4": "d) A bandeira do Brasil ficará no centro e em mastro mais alto que as demais.", "fonte": "Na lei 5700 de 1º/09/1971, artigo 12 e no Decreto nº 70274, 9/3/1972, artigo 31, você encontrará mais informações sobre o uso dos símbolos oficiais.", "opcaoCerta": 4, "opcaoEscolhida": 0 }, { "id": 2, "pergunta": "Em uma solenidade na Câmara Federal que reúne os chefes dos 3 poderes, a colocação deles na mesa-de-honra está correta no item:", "opcao1": "a) O presidente da República ocupará o centro da mesa-de-honra.", "opcao2": "b) O presidente do supremo tribunal federal ocupará o lugar a direita do presidente.", "opcao3": "c) O presidente da câmara ocupará o lugar central da mesa, o Presidente da República ficará à sua direita e o Presidente do Supremo Tribunal Federal a esquerda.", "opcao4": "d) O presidente da Câmara ocupará o lugar a esquerda do Presidente do Supremo Tribunal Federal.", "fonte": "Veja  módulo Solenidades neste curso e o Decreto nº 70274, 9/3/1972, titulo, ordem de precedência do artigo 6ª ao 10.", "opcaoCerta": 3, "opcaoEscolhida": 0 }, { "id": 3, "pergunta": "Numa solenidade de inauguração de uma obra pública municipal,  em local  aberto,  a  fala das autoridades se dará na seguinte ordem:", "opcao1": "a) O Deputado Federal é o primeiro a falar, o prefeito o segundo e o vereador o terceiro.", "opcao2": "b) O deputado estadual fará o discurso de encerramento  da solenidade.", "opcao3": "c) A ordem de fala será do presidente da Câmara municipal, seguido do deputado estadual, do deputado federal e o prefeito fala por último encerrando a solenidade.", "opcao4": "d) A ordem hierárquica das autoridades para discursos pode ser a critério do cerimonialista.", "fonte": "A ordem de fala das autoridades é o inverso da ordem de composição da mesa-de-honra, ou seja da menor hierarquia para a maior. Veja Decreto nº 70274, artigos 6º ao 10.", "opcaoCerta": 3, "opcaoEscolhida": 0 }, { "id": 4, "pergunta": "O convite a autoridades para participarem de uma solenidade oficial da Câmara Federal poderá ser:", "opcao1": "a) Por e-mail porque este é um meio mais rápido.", "opcao2": "b) Por telefone porque o tempo é curto pra usar outro meio de convite.", "opcao3": "c) Por convite impresso com endereçamento  e forma de tratamento corresponde ao cargo.", "opcao4": "d) Pode ser por fax porque é uma solenidade rápida e menos formal.", "fonte": "Vale a pena uma olhada no módulo 6 \\"Elaboração de convites\\" e também no Decreto 70274, de 9/3/1972.", "opcaoCerta": 3, "opcaoEscolhida": 0 }, { "id": 5, "pergunta": "A entregas de medalhas de ouro aos atletas de uma equipe de futebol campeã das olimpíadas segue a seguinte ordem:", "opcao1": "a) O presidente do clube recebe primeiro a medalha.", "opcao2": "b) O capitão do clube recebe primeiro, em seguida os atletas em fila indiana e os dirigentes após os atletas receberem.", "opcao3": "c) O técnico é o primeiro a receber e depois os atletas.", "opcao4": "d) Não existe ordem de precedência cerimonialistica, qualquer ordem é de bom tom.", "fonte": "O cerimonial privado tem maior flexibilidade na aplicação de procedimentos cerimonialístico, embora siga as regras do cerimonial oficial poderá definir regras específicas em seus Estatutos. Este comportamento é do Estatuto da FIFA/CBF.", "opcaoCerta": 2, "opcaoEscolhida": 0 } ] }';

var obj_json = jQuery.parseJSON(questoes_json);
var questoes = obj_json.questoes;

var questao_atual = 0;
var questoes_qtd = questoes.length;
var questao_opcao_sel;

// Verifica se a resposta está certa ou errada
function verificarResposta(resposta) {
	var res_tmp = "";

	if (questao_atual == questoes_qtd - 1) {
		$("#recomecar").show();
		$("#recomecar").animate({ height: "85px" });
		$("#questao-bt-proxima").hide();
	} else {
		$("#questao-bt-proxima").show();
	}

	$("#questao-opcao1").removeClass("clicavel");
	$("#questao-opcao2").removeClass("clicavel");
	$("#questao-opcao3").removeClass("clicavel");
	$("#questao-opcao4").removeClass("clicavel");

	questoes[questao_atual].opcaoEscolhida = resposta;

	if (questoes[questao_atual].opcaoCerta == resposta) {
		res_tmp += "<strong>Parabéns, você acertou!</strong><br><br>";
	} else {
		res_tmp += "<strong>Na verdade, a resposta certa é a letra </strong><span class=\"letra-certa\">" + questoes[questao_atual]["opcao" + questoes[questao_atual].opcaoCerta].substring(0, 1) + "</span><br><br>";
	}

	res_tmp += "<strong>FONTE:</strong> " + questoes[questao_atual].fonte;

	$("#questao-feedback-texto").html(res_tmp);
	$("#questao-feedback").show(200);
	$("#questao-feedback-seta").show(200);

}

// Monta apenas uma questão indicada
function montarQuestao(questao) {
	$("#questao-feedback").hide();
	$("#questao-feedback-seta").hide();
	$("#questao-bt-proxima").hide();

	$("#" + questao_opcao_sel).removeClass("questao-opcao-selecionado");

	$("#questao-pergunta").html(questao.id + " - " + questao.pergunta);

	$("#questao-opcao1").html(questao.opcao1);
	$("#questao-opcao2").html(questao.opcao2);
	$("#questao-opcao3").html(questao.opcao3);
	$("#questao-opcao4").html(questao.opcao4);

	$("#questao-opcao1").addClass("clicavel");
	$("#questao-opcao2").addClass("clicavel");
	$("#questao-opcao3").addClass("clicavel");
	$("#questao-opcao4").addClass("clicavel");

	if (questao.opcaoEscolhida > 0) {
		clicarOpcaoResposta("questao-opcao" + questao.opcaoEscolhida);
		verificarResposta(questao.opcaoEscolhida);
	}
}

// Gerenciar o clique nas opções de respostas
function clicarOpcaoResposta(opcao) {
	if (questao_opcao_sel != opcao) {
		$("#" + questao_opcao_sel).removeClass("questao-opcao-selecionado");
	}

	questao_opcao_sel = opcao;

	$("#" + questao_opcao_sel).addClass("questao-opcao-selecionado");
}

// Vai para a próxima questão
function proximaQuestao() {
	questao_atual++;

	montarQuestao(questoes[questao_atual]);
}

// Ver as propriedades de um objeto
function verObjeto(o) {
	var out = '';

	for (var p in o) {
		out += p + ': ' + o[p] + '\n';
	}

	return out;
}

$(document).ready(function () {
	montarQuestao(questoes[0]);

	$(".questao-opcao").on("click", function () {

		if ($(this).hasClass("clicavel")) {
			clicarOpcaoResposta($(this).attr("id"));
		}

		verificarResposta(questao_opcao_sel.substr(questao_opcao_sel.length - 1, 1));
	});

	$("#questao-bt-proxima").on("click", function () {
		proximaQuestao();
	});

	$("#comecar-questionario").click(function () {
		$("#esconde-questionario").hide();
	});

	$("#recomecar").on("click", function () {
		window.location.href = "https://addiemooc38.escolavirtual.gov.br/mod/book/view.php?id=13659&chapterid=14090";
	});

});