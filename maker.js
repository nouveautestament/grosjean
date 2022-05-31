fs = require('fs');


function clean (phrase)
{

phrase = phrase.replace(/Abra-ham/g,'Abraham');
phrase = phrase.replace(/accroî-tra/g,'accroîtra');
phrase = phrase.replace(/ado-rerez/g,'adorerez');
phrase = phrase.replace(/adul-tère/g,'adultère');
phrase = phrase.replace(/afflic-tions/g,'afflictions');
phrase = phrase.replace(/apprê-ter/g,'apprêter');
phrase = phrase.replace(/appro-chaient/g,'approchaient');
phrase = phrase.replace(/ap-proche/g,'approche');
phrase = phrase.replace(/Appro-chez-vous/g,'Approchez-vous');

phrase = phrase.replace(/Sei-gneur/g,'Seigneur');
phrase = phrase.replace(/sei-gneur/g,'seigneur');

phrase = phrase.replace(/dis-tance/g,'distance');
phrase = phrase.replace(/pro-phétie/g,'prophétie');
phrase = phrase.replace(/resplendis-sante/g,'resplendissante');
phrase = phrase.replace(/fai-seur/g,'faiseur');
phrase = phrase.replace(/neu-vième/g,'neuvième');
phrase = phrase.replace(/sanc-tuaire/g,'sanctuaire');
phrase = phrase.replace(/vête-ments/g,'vête-ments');



phrase = phrase.replace(/II/g,'Il');
phrase = phrase.replace(/sanftuaire/g,'sanctuaire');


phrase = phrase.replace(/inStant/g,'instant');




//phrase = phrase.replace(/vrai-ment/g,'vraiment');
phrase = phrase.replace(/XXXXXX/g,'XXXXXX');
phrase = phrase.replace(/XXXXXX/g,'XXXXXX');


//$ £ S C : est
phrase = phrase.replace(/ESt/g,'Est');
phrase = phrase.replace(/E\$t/g,'Est');
phrase = phrase.replace(/eSt/g,'est');
phrase = phrase.replace(/e\$t/g,'est');
phrase = phrase.replace(/e£t/g,'est');
phrase = phrase.replace(/eCt/g,'est');


//ex. juSte | sanCtuaire
phrase = phrase.replace(/([a-z])S/g,'$1s');
phrase = phrase.replace(/([a-z])C/g,'$1c');

return phrase;
}


for (chiffre_livre = 1 ; chiffre_livre != 28 ; chiffre_livre++)
{

	livre			= './'+chiffre_livre+'/'+chiffre_livre+'.txt';
	result			= fs.readFileSync(livre, 'utf8');


	lignes		= result.match(/^.*$/mg);
	//chapitres	= result.match(/CHAPITRE/gs);
	//console.log(chiffre_livre+' -> '+lignes[0]+' '+chapitres.length)
	
	
	chapitre	= 0;
	chap		= 0;
	ver			= 0;
	verset		= 0;
	start		= 0;
	texte		= ''
	
	for (ligne = 0 ; ligne != lignes.length ; ligne++)
	{
		if (lignes[ligne].match(/CHAPITRE/))
		{
			prevchap	= chapitre;
			prevver		= verset;
			
			start	= 0;
			verset	= 0;
			chapitre++;
			
			//console.log(lignes[0]+' '+chapitre)
			//console.log(lignes[ligne])
		}
		
		if (regverset=lignes[ligne].match(/([0-9]+)/))
		{
			//super clean
			
			texte = clean(texte);
			
			if (process.argv[2] == 'all')
			{
				if (ver != 0) console.log(chiffre_livre+':'+chap+':'+ver+' '+texte)
			}
			
			if (process.argv[2] == 'mot')
			{
				//by word
				cutcheck = texte.match(/\S+/g);
			
				if (cutcheck)
					for (nb = 0 ; nb != cutcheck.length ; nb++)
					{
						console.log(cutcheck[nb])
			
					}
			}
			
			start = 1;
			texte = '';
			
			verset++;
			
			//CHECK VER
			if (regverset[1] != verset) console.log('ERROR :'+chiffre_livre+' -> '+lignes[0]+' '+chapitre+' '+regverset[1]+' '+verset+' '+lignes[ligne])
		
		}
		
		if (start == 1 && lignes[ligne] != "")
		{
			//clean
			txt = lignes[ligne].replace(/[0-9]+/g,'');
			txt = txt.replace(/\s+/g,' ');
			txt = txt.replace(/^ +| +$/g,'');
			
			if (txt.match(/-$/))
				texte += txt+'';
			
			else
				texte += txt+' ';

			chap	= chapitre;
			ver		= verset;
		
		}
	
	
		//END FILE
		lignetest = ligne+1
		if (lignes.length == lignetest)
		{
			texte = clean(texte);
			
			if (process.argv[2] == 'all')
			{
				console.log(chiffre_livre+':'+chap+':'+ver+' '+texte)
			}
			
			if (process.argv[2] == 'mot')
			{
				//by word
				cutcheck = texte.match(/\S+/g);
			
				if (cutcheck)
					for (nb = 0 ; nb != cutcheck.length ; nb++)
					{
						console.log(cutcheck[nb])
			
					}
			}
			
		}
	
	
	}
	

}