window.onload = function() {

    // Variaveis para os fogos
    var fogos = [];
    var posicoesFogo = [0, 20, 40, 60, 80];
    var estadoDoFogo = []; // isto vai ser um array de booleans (True or False)
                        // , basicamente se o primeiro index da array for True significa que o fogo 1 esta ativo e por ai fora...

    var arvores = [];
    var posicoesArvores = [15, 35, 55, 75];
    var estadoArvore = []; //ve se o fogo foi atingido para desaparecer gradualmente
    var velocidadeDoFogo = 2;
    var probabilidadeDeFogo = 5;

    var fireman;
    var tecla;
    var posX;
    var velocidade;


    // chama função a cada 1 segundo
    start_game();
    setInterval(fire_manage , 1000);
    setInterval(colisoes , 1000);
    setInterval(arvore_manage , 500);
    fireman = document.getElementById("fireman");
    fireman.style.left = 0 + "%";

    window.onkeydown = function (event) {
        tecla = event.key;

        posX = parseInt(fireman.style.left);
        velocidade = 15;

        switch (tecla) {
            case "a":
                fireman.style.left = posX - velocidade + "%";
                break;
            case "d":
                fireman.style.left = posX + velocidade + "%";
                break;
            default:
        }
    };

    function start_game(){
        // Buscar os varios fogos pelo seu ID (i representa o index deles i.e. fogo1... fogo2.. etc)
        // como existem fogos de 1 a 5 o for so vai de 1 a 5...
        for (var i = 1; i < 6 ; i++)
        {
            // a ir buscar o fogo+i (fogo1, fogo2...)
            var fogo = document.getElementById("fogo" + i);
            // definir o top dele com -5% para que nao apareça no ecrã
            fogo.style.top = "-10%";
            fogo.style.left = posicoesFogo[i-1].toString() + "%";
            // depois de fazer isso adiciona ao array onde tem os fogos todos do jogo (ate agora so tem 5 ..)
            fogos.push(fogo); // adiciona o fogo ao array
            estadoDoFogo.push(false); // todos fogos comecam como inativos a.o 20e tal
        }

        for (i = 1; i < 5 ; i++)
        {
            var arvore = document.getElementById("arvore" + i);
            arvore.style.bottom = "4%";
            arvore.style.left = posicoesArvores[i-1].toString() + "%";
            arvores.push(arvore);
            estadoArvore.push(false);
        }
    }

    function fire_manage(){
        // por cada fogo que se encontra no array dos fogos
        for (var i = 0; i < fogos.length; i++)
        {
            // se este fogo tiver ativo, o seu top vai ser incrementado para que continue a descer
            if( estadoDoFogo[i] === true ) {
                // buscar a sua posicao actual
                var posFire = parseInt(fogos[i].style.top);
                // caso ele ja tenha chegado ao fim da pagina
                if (posFire === 90)
                {
                    estadoDoFogo[i] = false;
                    fogos[i].style.top = "-10%";
                }
                else
                {
                    // incrementar o valor dele do top (para que va descendo)
                    fogos[i].style.top = posFire + velocidadeDoFogo + "%";
                }
            }
            // caso nao esteja ativo, vai ser feito um mathRandom para ver se passa a ficar activo (much probabilidades)
            else {
                // random entre 1 e 100
                var prob = Math.floor((Math.random() * 100) + 1);
                // se a prob for menor que a probabilidadeDeFogo o fogo vai passar a ativo
                if ( prob < probabilidadeDeFogo)
                {
                    estadoDoFogo[i] = true;
                }
            }
        }
    }

    function colisoes () {

        for( var i = 0 ; i < fogos.length ; i++)
        {
            var posFireTop = parseInt(fogos[i].style.top);
            var posFireLeft = parseInt(fogos[i].style.left);

            if( posFireTop > 55)
            {
                for (var j = 0; j < arvores.length; j++) {
                    var posTreeLeft = parseInt(arvores[j].style.left);
                    if ( posFireLeft > posTreeLeft && posFireLeft < posTreeLeft + 12 && estadoArvore[j] === false)
                    {
                        estadoArvore[j] = true;
                        arvores[j].style.opacity = "1";
                    }
                }
            }
        }

    }

    function arvore_manage() {
        for (var j = 0; j < arvores.length; j++) {
            if(estadoArvore[j] === true)
            {
                var opacity = parseFloat(arvores[j].style.opacity);
                if( opacity !== 0){
                    var tmp = opacity - 0.1;
                    arvores[j].style.opacity = tmp.toString();
                }
            }
        }

    }

};

