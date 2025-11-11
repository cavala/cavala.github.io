$(document).ready(function() {

    // 1. Função principal de tradução
    function translate(lang) {
        console.log("JSON carregado:", lang);
        // Define o caminho para o arquivo JSON
        var langFile = 'assets/lang/' + lang + '.json';
        
        // Usa o método getJSON do jQuery para carregar o arquivo
        $.getJSON(langFile, function(data) {
            
            // 2. Percorre cada elemento que tem o atributo 'data-key'
            $('[data-key]').each(function() {
                var key = $(this).data('key'); // Pega o valor da 'data-key'
                var translation = data[key];    // Busca a tradução no JSON

                // DEBUG: Veja o que o loop está encontrando
                console.log("Chave:", key, "Tradução:", translation);

                // 3. Lógica para diferentes tipos de elementos
                if (translation) {
                    // Se for um input ou textarea, muda o placeholder
                    if ($(this).is('input') || $(this).is('textarea')) {
                        $(this).attr('placeholder', translation);
                    } 
                    // Se for qualquer outro elemento, muda o html
                    else {
                        $(this).html(translation);
                    }
                } else {
                    // DEBUG: Avisa se a chave do HTML não foi achada no JSON
                    console.warn("Chave não encontrada no JSON:", key);
                }
            });

            // 4. (Opcional) Atualiza o atributo 'lang' da tag <html>
            $('html').attr('lang', lang);

        }).fail(function() {
            console.error("Erro ao carregar o arquivo de idioma: " + langFile);
        });
    }

    // 5. Event Listeners para os botões
    $('#btn-pt').on('click', function() {
        translate('pt');
    });

    $('#btn-en').on('click', function() {
        translate('en');
    });

    // 6. (Opcional) Carrega um idioma padrão ao iniciar a página
    // Você pode detectar o idioma do navegador ou definir um padrão
    translate('en'); // Carrega português por padrão

});