import json


def geraFilme(ficheiro,filme):
    ficheiro.write(f'''<!DOCTYPE html>
<html>
    <head>
        <title>{filme["title"]}</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="icon" href="./img/favicon.png">
    </head>\n''')
    ficheiro.write(f'\t<body>\n')
    ficheiro.write(f'''\t\t<header>
            <h1 class="w3-blue w3-center">{filme["title"]}</h1>
        </header>    
    ''')
    ficheiro.write(f'\t<ul class="w3-ul w3-center w3-hoverable">\n')
    ficheiro.write(f'\t\t\t<li><h3>Ano</h3><b>{filme["year"]}</b></li>\n')
    ficheiro.write(f'\t\t\t<li><h3>Atores</h3>\n')
    ficheiro.write(f'\t\t\t\t<ul class="w3-ul w3-center">\n')
    for a in filme["cast"]:
        ficheiro.write(f'\t\t\t\t\t<li>{a}</li>\n')
    ficheiro.write(f'\t\t\t\t</ul>\n\t\t\t</li>\n')

    ficheiro.write(f'\t\t\t<li><h3>Generos</h3>\n')
    ficheiro.write(f'\t\t\t\t<ul class="w3-ul w3-center">\n')
    for g in filme["genres"]:
        ficheiro.write(f'\t\t\t\t\t<li>{g}</li>\n')
    ficheiro.write(f'\t\t\t\t</ul>\n\t\t\t</li>\n\t\t</ul>\n')
    ficheiro.write(f'''\t\t<footer class="w3-black w3-padding w3-center w3-padding-xlarge">
            <p>{filme["title"]} &copy; 2022</p>
        </footer>
    ''')

    ficheiro.write(f'</body>\n</html>')
    ficheiro.close()

def geraIndexFilmes(ficheiro,filmes):
    ficheiro.write(f'''<!DOCTYPE html>
<html>
    <head>
        <title>Página de filmes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="icon" href="./img/favicon.png">
    </head>\n''')
    ficheiro.write(f'\t<body>\n')
    ficheiro.write(f'''\t\t<header class="w3-bar w3-blue">
		    <h1 class="w3-bar-item">Listagem de filmes</h1>		
		    <input class="w3-bar-item w3-input w3-round w3-border w3-right" search="filmes" style="margin-top: 20px; margin-right: 30px;" placeholder="Procure um filme">	
	    </header>
    ''')
    ficheiro.write(f'\t<ul id="filmes" class="w3-ul w3-center w3-hoverable">\n')
    for i,f in enumerate(filmes):
        ficheiro.write(f'\t\t\t<li nome="{f["title"]}"><a href="/filmes/f{i}">{f["title"]}</a></li>\n')

    ficheiro.write(f'\t\t</ul>\n')
    ficheiro.write(f'''\t\t<footer class="w3-black w3-padding w3-center w3-padding-xlarge w3-bottom">
            <p>Filmes &copy; 2022</p>
        </footer>
    ''')
    ficheiro.write(f'\t\t<script src="./js/scripts.js"></script>\n')
    ficheiro.write('\t</body>\n</html>')
    ficheiro.close()

def geraAtor(ficheiro,ator,filmes,filmPag):
    ficheiro.write(f'''<!DOCTYPE html>
<html>
    <head>
        <title>{ator}</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="icon" href="./img/favicon.png">
    </head>\n\t<body>\n''')
    ficheiro.write(f'''\t\t<header>
            <h1 class="w3-blue w3-center">{ator}</h1>
        </header>    
    ''')
    ficheiro.write(f'\t<ul class="w3-ul w3-center w3-hoverable">\n')
    ficheiro.write(f'\t\t\t<li><h3>Filmes</h3>\n')
    ficheiro.write(f'\t\t\t\t<ul class="w3-ul w3-center">\n')
    for f in filmes:
        ficheiro.write(f'\t\t\t\t\t<li><a href="/filmes/{filmPag[f]}">{f}</a></li>\n')
    ficheiro.write(f'\t\t\t\t</ul>\n\t\t\t</li>\n')

    ficheiro.write(f'\n\t\t</ul>\n')
    ficheiro.write(f'''\t\t<footer class="w3-black w3-padding w3-center w3-padding-xlarge w3-bottom">
            <p>{ator} &copy; 2022</p>
        </footer>
    ''')
    ficheiro.write(f'</body>\n</html>')
    ficheiro.close()

def geraIndexAtores(ficheiro,atores):
    ficheiro.write(f'''<!DOCTYPE html>
<html>
    <head>
        <title>Página de Atores</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="icon" href="./img/favicon.png">
    </head>\n''')
    ficheiro.write(f'\t<body>\n')
    ficheiro.write(f'''\t\t<header class="w3-bar w3-blue">
		    <h1 class="w3-bar-item">Listagem de atores</h1>		
		    <input class="w3-bar-item w3-input w3-round w3-border w3-right" search="atores" style="margin-top: 20px; margin-right: 30px;" placeholder="Procure um ator">	
	    </header>
    ''')
    ficheiro.write(f'\t<ul id="atores" class="w3-ul w3-center w3-hoverable">\n')
    for i,a in enumerate(atores):
        ficheiro.write(f'\t\t\t<li nome="{a}"><a href="/atores/a{i}">{a}</a></li>\n')

    ficheiro.write(f'\t\t</ul>\n')
    ficheiro.write(f'''\t\t<footer class="w3-black w3-padding w3-center w3-padding-xlarge w3-bottom">
            <p>Atores &copy; 2022</p>
        </footer>
    ''')
    ficheiro.write(f'\t\t<script src="./js/scripts.js"></script>\n')
    ficheiro.write('\t</body>\n</html>')
    ficheiro.close()


def geraIndex(ficheiro):
    ficheiro.write(f'''<!DOCTYPE html>
<html>
    <head>
        <title>Página de filmes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="icon" href="./img/favicon.png">
    </head>\n''')
    ficheiro.write(f'\t<body>\n')
    ficheiro.write(f'''\t\t<header class="w3-blue w3-center w3-padding">
		    <h1>Escolha O Que Pretende Ver</h1>		
	    </header>
    ''')
    ficheiro.write(f'''
    <div class="w3-col m5 w3-card-4 w3-margin w3-left w3-center">
			<header class="w3-container w3-blue">
			  	<h1>Filmes</h1>
			</header>
			<div class="w3-container">
				<img src="./img/filme.png">
			</div>
			<footer class="w3-container w3-black">
				<h5>
					<a class="w3-button w3-blue" href="./indexFilmes.html">Ver Filmes</a>
			  	</h5>
			</footer>
		</div>
        <div class="w3-col m5 w3-card-4 w3-margin w3-right w3-center">
			<header class="w3-container w3-blue">
			  	<h1>Atores</h1>
			</header>
			<div class="w3-container">
				<img src="./img/ator.png">
			</div>
			<footer class="w3-container w3-black">
				<h5>
					<a class="w3-button w3-blue" href="./indexAtores.html">Ver Atores</a>
			  	</h5>
			</footer>
		</div>
    ''')
    ficheiro.write(f'''\t\t<footer class="w3-black w3-padding w3-center w3-padding-xlarge w3-bottom">
            <p>Filmes &copy; 2022</p>
        </footer>
    ''')
    ficheiro.write('\t</body>\n</html>')
    ficheiro.close()



dataSet = open("./cinemaATP.json")
dados = json.load(dataSet)

atores = {}

for d in dados:
    for a in d["cast"]:
        atores.setdefault(a,[])
        atores[a].append(d['title'])

dadosOrdenados = sorted(dados, key=lambda t: t['title']) 

index = open(f'./site/index.html','w')
indexAtores = open(f'./site/indexAtores.html','w')
indexFilmes = open(f'./site/indexFilmes.html','w')

geraIndex(index)

associacaoFilPag = {}

for i,filme in enumerate(dadosOrdenados):
    ficheiro = open(f'./paginas/filmes/f{i}.html', 'w')
    associacaoFilPag[filme["title"]] = f'f{i}'
    geraFilme(ficheiro,filme)

geraIndexFilmes(indexFilmes,dadosOrdenados)

i = 0
for a,f in atores.items():
    ficheiro = open(f'./paginas/atores/a{i}.html', 'w')
    geraAtor(ficheiro,a,f,associacaoFilPag)
    i += 1

geraIndexAtores(indexAtores,atores.keys())
