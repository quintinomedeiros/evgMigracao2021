var questao_atual = 1;
	var questoes = [];

	questoes[0] = { "id": 1, "texto": "Pode ser hasteada em mastro ou adriças, nos edifícios públicos ou particulares, templos, campos de esporte, escritórios, salas de aula, auditórios, embarcações, ruas e praças, e em qualquer lugar em que lhe seja assegurado o devido respeito.", "imagem": "imagem1.png", "respostaCerta": "v", "respostaEscolhida": "" };
	questoes[1] = { "id": 2, "texto": "Pode ser distendida e sem mastro, conduzida por aeronaves ou balões, aplicada sobre parede ou presa a um cabo horizontal ligando edifícios, árvores, postes ou mastro.", "imagem": "imagem2.png", "respostaCerta": "v", "respostaEscolhida": "" };
	questoes[2] = { "id": 3, "texto": "É permitido reproduzi-la sobre paredes, tetos, vidraças, veículos e aeronaves.", "imagem": "imagem3.png", "respostaCerta": "v", "respostaEscolhida": "" };
	questoes[3] = { "id": 4, "texto": "Pode compor, com outras bandeiras, panóplias, escudos ou peças semelhantes.", "imagem": "imagem4.png", "respostaCerta": "v", "respostaEscolhida": "" };
	questoes[4] = { "id": 5, "texto": "Pode ser conduzida em formaturas, desfiles, ou mesmo individualmente.", "imagem": "imagem5.png", "respostaCerta": "v", "respostaEscolhida": "" };
	questoes[5] = { "id": 6, "texto": "É permitido distende-la sobre ataúdes, até a ocasião do sepultamento.", "imagem": "imagem6.png", "respostaCerta": "v", "respostaEscolhida": "" };

	var questoes_qtd = questoes.length;

	var questoes_feedbacks = { "v": "Parabéns, você parece conhecer bem a Lei 5.700, de 1º de setembro de 1971.", "f": "Segundo a Lei 5.700, de 1º de setembro de 1971, esta afirmação é verdadeira." };


	// Monta todas as questões
	function montarQuestoes(questoes) {
		var questoes_qtd = questoes.length;
		var retorno = "";

		$("#resultado").html("Carregando dados…");

		for (var i = 0; i < questoes_qtd; i++) {
			retorno += '<strong>Questão ' + questoes[i].id + '</strong><br><br>';
			retorno += '(' + questoes[i].respostaCerta + ') ' + questoes[i].texto + '<br>';
			retorno += '<img src="imagens/' + questoes[i].imagem + '" alt="" border="0" width="212" height="212" /><br><hr>';
		}

		$("#resultado").html(retorno);
	}

	// Verifica se a resposta está certa ou errada
	function verificarResposta(resposta) {
		var res_tmp = "";

		if (questao_atual < questoes_qtd) {
			$("#questao-bt-proxima").show();
		} else {
			$("#recomecar").show();
			$("#recomecar").animate({ height: "85px" });
		}

		questoes[questao_atual - 1].respostaEscolhida = resposta;

		$("#questao-bt-v").removeClass("questao-bt-hover");
		$("#questao-bt-f").removeClass("questao-bt-hover");

		if (questoes[questao_atual - 1].respostaCerta == resposta) {
			res_tmp = "v";
		} else {
			res_tmp = "f";
		}

		$("#questao-seta-baixo").attr("class", "questao-seta-baixo-" + res_tmp);
		$("#questao-seta-baixo").show(200);

		$("#questao-feedback").html(questoes_feedbacks[res_tmp]);
		$("#questao-feedback").show(200);

		$("#questao-bt-" + res_tmp).addClass("questao-bt-hover");
	}

	// Monta apenas uma questão indicada
	function montarQuestao(questao) {
		$("#questao-bt-proxima").hide();

		$("#questao-texto").html(questao.texto);

		$("#questao-imagem").html('<img src="https://addiemooc38.escolavirtual.gov.br/pluginfile.php/17412/mod_folder/content/0/jogos/' + questao.imagem + '" alt="" border="0" width="212" height="212" />');
	}

	// Avança para a próxima questão
	function proximaQuestao() {
		$("#questao-bt-v").removeClass("questao-bt-hover");
		$("#questao-bt-f").removeClass("questao-bt-hover");

		$("#questao-seta-baixo").hide(200);
		$("#questao-feedback").hide(200);

		montarQuestao(questoes[questao_atual]);

		questao_atual++;

		if (questao_atual == questoes_qtd) {
			$("#questao-bt-proxima").hide();
		}
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

		$(".questao-bt-vf").on("click", function () {
			verificarResposta($(this).attr("id").substr($(this).attr("id").length - 1, 1));
		});

		$("#questao-bt-proxima").on("click", function () {
			proximaQuestao();
		});

		$("#comecar-jogo").click(function () {
			$("#esconde-jogo").hide();
		});

		$("#recomecar").on("click", function () {
			window.location.href = "https://addiemooc38.escolavirtual.gov.br/mod/book/view.php?id=13655&chapterid=14066";
		});
	});