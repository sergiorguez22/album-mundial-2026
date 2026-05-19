#!/usr/bin/env bash
# Copia las 48 banderas desde C:/Users/srodr/OneDrive/Desktop/Mundial/ a public/flags/
# con nombres ASCII en kebab-case basados en el codigo del team.

set -e
SRC="C:/Users/srodr/OneDrive/Desktop/Mundial"
DST="C:/Users/srodr/OneDrive/Desktop/album-mundial-2026/public/flags"
mkdir -p "$DST"

declare -A MAP=(
  ["esp.png"]="Bandera España.png"
  ["mar.png"]="Bandera Marruecos.png"
  ["mex.png"]="Bandera México.png"
  ["rsa.webp"]="Bandera Sudáfrica.webp"
  ["kor.png"]="Bandera Korea del Sur.png"
  ["cze.webp"]="Bandera República Checa.webp"
  ["can.png"]="Bandera Canadá.png"
  ["usa.png"]="Bandera Estados Unidos.png"
  ["par.png"]="Bandera Paraguay.png"
  ["qat.png"]="Bandera Qatar.png"
  ["sui.png"]="Bandera Suiza.png"
  ["hai.png"]="Bandera Haití.png"
  ["sco.png"]="Bandera Escocia.png"
  ["tur.png"]="Bandera Turquía.png"
  ["cuw.png"]="Bandera Curazao.png"
  ["civ.png"]="Bandera Costa de Marfil.png"
  ["ecu.png"]="Bandera Ecuador.png"
  ["ned.png"]="Bandera Países Bajos.png"
  ["jpn.png"]="Bandera Japón.png"
  ["swe.png"]="Bandera Suecia.png"
  ["tun.png"]="Bandera Túnez.png"
  ["egy.webp"]="Bandera Egipto.webp"
  ["irn.png"]="Bandera Irán.png"
  ["nzl.webp"]="Bandera Nueva Zelanda.webp"
  ["uru.png"]="Bandera Uruguay.png"
  ["fra.png"]="Bandera Francia.png"
  ["sen.png"]="Bandera Senegal.png"
  ["irq.webp"]="Bandera Irak.webp"
  ["nor.webp"]="Bandera Noruega.webp"
  ["jor.png"]="Bandera Jordania.png"
  ["por.webp"]="Bandera Portugal.webp"
  ["cod.png"]="Bandera República Democrática del Congo.png"
  ["uzb.png"]="Bandera Uzbekistán.png"
  ["col.png"]="Bandera Colombia.png"
  ["eng.png"]="Bandera Inglaterra.png"
  ["cro.png"]="Bandera Croacia.png"
  ["gha.png"]="Bandera Ghana.png"
  ["pan.png"]="Bandera Panamá.png"
)

declare -A MAP_SUB=(
  ["ger.png"]="Alemania/Bandera Alemania.png"
  ["arg.png"]="Argentina/Bandera Argentina.png"
  ["aus.svg"]="Australia/Bandera Australia.svg"
  ["aut.png"]="Austria/Bandera Austria.png"
  ["bra.png"]="Brasil/Bandera Brasil.png"
  ["bel.png"]="Bélgica/Bandera Bélgica.png"
  ["bih.png"]="Bosnia y Herzegovina/Bandera Bosnia y Herzegovina.png"
  ["cpv.png"]="Cabo Verde/Bandera Cabo Verde.png"
  ["ksa.png"]="Arabia Saudita/Bandera Arabia Saudita.png"
  ["alg.png"]="Argelia/Bandera Argelia.png"
)

count=0
missing=0

for out in "${!MAP[@]}"; do
  in="$SRC/${MAP[$out]}"
  if [ -f "$in" ]; then
    cp -f "$in" "$DST/$out"
    count=$((count+1))
  else
    echo "MISSING: $in" >&2
    missing=$((missing+1))
  fi
done

for out in "${!MAP_SUB[@]}"; do
  in="$SRC/${MAP_SUB[$out]}"
  if [ -f "$in" ]; then
    cp -f "$in" "$DST/$out"
    count=$((count+1))
  else
    echo "MISSING: $in" >&2
    missing=$((missing+1))
  fi
done

echo "Copied: $count"
echo "Missing: $missing"
ls "$DST" | wc -l
