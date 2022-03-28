import re
import json

with open("arq-son.json","r",encoding="utf-8") as f:
    content = f.readlines()

dictG = {}
dictG["musicas"] = []

for i,linha in enumerate(content):
    linha = re.sub(r"[\n]","",linha)
    atributoEspecial = re.search(r"\"obsFiles\":\[(.*)\]",linha)
    linha = re.sub(r"\"obsFiles\":\[(.*)\],","",linha)
    
    dictP = {}

    if atributoEspecial:
        obsFiles = []
        files = re.split(r'\},\{',atributoEspecial.group(1))
        for f in files:
            f = re.sub(r'[{}]',"",f)
            f = re.sub(r'\"',"",f)
            fileParts = re.split(r",",f)
            dictFileP = {}
            for fp in fileParts:
                fileAtrib = re.split(r":",fp)
                dictFileP[fileAtrib[0]] = fileAtrib[1]
            obsFiles.append(dictFileP)
        dictP["obsFiles"] = obsFiles

    atributos = re.split(r"\",\"",linha)
    conjunto = set(atributos)
    
    for e in conjunto:
        e = re.sub(r"[{}]","",e)
        e = re.sub(r"\"","",e)
        partes = re.split(r":",e)
        if partes[0] == "duracao":
            partes[1] = partes[1] + ":" + partes[2]
        dictP[partes[0]] = partes[1]
   
    dictP["id"] = i
    dictG["musicas"].append(dictP)
    


with open('./data/db.json', 'w', encoding="utf-8") as f:
    json.dump(dictG, f, ensure_ascii=False, indent=4)
