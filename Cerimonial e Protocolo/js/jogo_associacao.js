var total_simbolos = 12;
var acertos = 0;
var i;

$(init);

function init() {

	// Reseta o jogo
	acertos = 0;
	$('#simbolos').html('');
	$('#simbolos-slots').html('');

	// Cria a pilha de simbolos aleatórios
	var simbolos_array = [[1, "cristianismo.png"], [2, "urano.png"], [3, "olimpiadas.png"], [4, "judaismo.png"], [5, "yin_yang.png"], [6, "comunismo.png"], [7, "nazismo.png"], [8, "islamismo.png"], [9, "escorpiao.png"], [10, "nuclear.png"], [11, "plutao.png"], [12, "hinduismo.png"]];

	simbolos_array.sort(function () { return Math.random() - 0.5; });

	for (i = 0; i < total_simbolos; i++) {
		$('<div><img src="https://www.educacaoadistancia.camara.leg.br/ead_cfd/pluginfile.php/198054/mod_folder/content/0/jogos/simbolos/' + simbolos_array[i][1] + '" alt="" border="0" width="48" height="48" /></div>').data('numero', simbolos_array[i][0]).attr('id', 'simbolo_' + simbolos_array[i][0]).appendTo('#simbolos').draggable({
			containment: '#jogo',
			stack: '#simbolos div',
			cursor: 'move',
			revert: true
		});
	}

	// Cria os slots com os nomes dos símbolos
	var nomes_array = ["Cristianismo", "Urano", "Olímpiadas", "Judaísmo", "Yin-Yang", "Comunismo", "Nazismo", "Islamismo", "Escorpião", "Nuclear", "Plutão", "Hinduísmo"];

	for (i = 1; i <= total_simbolos; i++) {
		$('<div>' + nomes_array[i - 1] + '</div>').data('numero', i).appendTo('#simbolos-slots').droppable({
			accept: '#simbolos div',
			hoverClass: 'hovered',
			drop: gerenciarSoltarSimbolo
		});
	}

}

function gerenciarSoltarSimbolo(event, ui) {
	var slot_numero = $(this).data('numero');
	var simbolo_numero = ui.draggable.data('numero');

	// Se o simbolo for solto no slot correto, impedir que ele seja arrastado, posicionar ele dentro do slot e incrementar o total de acertos
	if (slot_numero == simbolo_numero) {
		ui.draggable.draggable('disable');
		$(this).droppable('disable');
		ui.draggable.position({ of: $(this), my: 'center bottom-10px', at: 'center bottom' });
		ui.draggable.draggable('option', 'revert', false);
		acertos++;
	}

	// Se todas os simbolos forem posicionados corretamente, mostrar o feedback e o botão para jogar novamente
	if (acertos == total_simbolos) {
		$("#feedback").show();
		$("#recomecar").show();
		$("#recomecar").animate({ height: "85px" });
	}

}

function verObjeto(o) {
	var out = '';

	for (var p in o) {
		out += p + ': ' + o[p] + '\n';
	}

	return out;
}

$(document).ready(function () {
	$("#comecar-jogo").click(function () {
		$("#esconde-jogo").hide();
	});

	$("#recomecar").on("click", function () {
		window.location.href = "https://www.educacaoadistancia.camara.leg.br/ead_cfd/mod/book/view.php?id=13318&chapterid=285";
	});
});