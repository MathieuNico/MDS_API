export default function determinecoupure(billet) {
    let result = "";
    if (billet.devise == '€') {
        for (let i = 0; i < billet.euro.length; i++) {  
            let nbBillet = Math.floor(billet.montant / billet.euro[i]);
            billet.montant = billet.montant % billet.euro[i];
            if (nbBillet) {
                if(result == "") {
                    result += nbBillet + ' billet de ' + billet.euro[i] + '€';
                }else {
                    result += ' et '+ nbBillet + ' billet de ' + billet.euro[i] + '€';
                }
            }
        }
    }
    else if (billet.devise == '$') {
        for (let i = 0; i < billet.dollar.length; i++) {  
            let nbBillet = Math.floor(billet.montant / billet.dollar[i]);
            billet.montant = billet.montant % billet.dollar[i];
            if (nbBillet) {
                result +=', '+ nbBillet + ' billet de ' + billet.euro[i];
            }
        }
    }
    return result;    
}
