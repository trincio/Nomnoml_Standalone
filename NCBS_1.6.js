                     /*************************/
           /************                   *************/
        /*******         Gabriele Motta 2020       ********/
     /**                                                    **/
   /**     Trincio Nomnoml Complete Backup Solution v.1.0     **/ 					 
  /*                                                            */	
  /*    Code style: rough and framework free, sufficient rea-   */	
  /*                dability, nice ideas.                       */	  
  /*                                                            */	 
  /*      www.gabrielemotta.com   -   www.trincio.com           */	 
  /*                     ALL RIGHTS RESERVED                    */	  
  /*  Freely licensed to mr. Daniel Kallin for implementing and */	
  /*       freely distribute its Nomnoml application            */	  
  /*                                                            */	    
  /*       Target: inject a simple and effective backup         */					 
   /**             system to my loved Nomnoml <3<3<3          **/ 
     /**                                                    **/
        /*******                                   ********/
           /************                   *************/
                     /*************************/					 

// STYLE PUSHED RUNTIME

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '                       \
	.BTN {                                \
	background: #76726a; color: #fdf6e3;  \
	border: 0px; border-radius: 0.5em;    \
	padding:0.3em;						  \
	cursor: pointer;\
	}                                     \
										  \
	.checked::before{ content:" ☑ ";}	  \
	.unchecked::before{ content:" ☐ ";}   \
	.not_reserved{color:black;}           \
	.reserved{color:red;}                 \
';
document.getElementsByTagName('head')[0].appendChild(style);

// SPECIAL FILENAMES (lets call them "RESERVED") IN THE BACKUP
var reserved_filenames = ["nomnoml.file_index", "nomnoml.lastSource"]

// CURRENT NOMNOML BACKUP
var CUR_NMNML_BKP = "";

var NCBS_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAACdCAMAAADWgN4dAAAAh1BMVEUAAAB2dmJ1cmh1cmh1cmh4bmh1cmh1cmh1cmh1cWh2cmd1cmh2cWl1cmh0cmh1cmhycmp1cmh1cmh1cmh1cmh1cmh1cmh1cmh1cmh0cmh1c2h1cmh1cmh1cmh1cmh1cmh1cmh1cmh0c2h1cmh1cmh1cmh1cmh1c2h1cmh1cmh1cmh1cmh1cmiDylXtAAAALHRSTlMABnZxWQpqKjcyJFMTZR1FDopOX/mFPZyAfBirkLzj7qTcSsvE0rRBlun01gfQ4b4AABuiSURBVHja7NrZtqo4FAXQlYQEAoRWekTF3rP///sKsSuOWs3Ttc6t+aBDfHEsA9k7Cd7ZrzYS//uHCiILvyV/ftT4lxqiFL8lRbTDv7SjU407ht8HJzrinwuOXYDtzMKFFGmfqCrCb6InWuCfS4hM+OXgIirHnPzWx++BLWiLfy4kcmyGKyEBVwIynv4DzWq1+5nzAKcWUjO8Z/FDEScYebTEHVNwlJW5gA5x5y9Lm7H9fO3ih7EqX6729pEsvMUDDGxeY7BTOGNun6pquRScK/OV1mgZrlgSYVQeNX6WDXWuZl/USbwTuqj3EgB3AT8Cy0WzWjexSsI0k2C1bveeOu4qsfcxUXQ1fhR3RSsZUmfjLYE8MzEDEAOBlQrjeUk46tdFVWW8kcABYDoVgiePyPzFEj9LVK1V0vp4L8MBCBIAYXEw0bSe4LndN6IS8c7HiGnFuXf9EM9+2OA6s/FXOLMB3wD7uAFcrzo082bZitAHIFOlMdCxWhbWLXQ3FSLxAZcsPDD777OT5uOnUoW/EggAifa5lvNlR4vFatUtZjTYxs4jUsDZrYXRuLJVVvZHjjuH555guIqcl9G1Zm/w2QTeYFbPAJuLUoSx7Fezypa4iLTVbom2io3ReJeEYk8rFTJcRGK20/d4FIQXWRg5lfBM7OJJ6bctPpvx8Vp17SElMybYFcESU7XaUGcAWeEqzzRsNcSC0ZfKhcoZBp6/zwHrkmJ+q22/S0p9wGerLbwmiEhjoHpvnUOXthOGepKtGy/WYezjLuEBEKgq9QGsJABHKa+GgG0h7AE4hmEUGTwzH1+klXiNLYkEAC/MdhFT68ozVdOIiqcu7qL1rJ3evikDEIgsVQUufEtsm1RxDUAluKnwjbR4gCvdfmhunoM3DHHA5e2ShcJWOPNFAhkaY3qtdW5ZJmRZPB2rXOPMOc73uHGXuSU4r3aFLXGVTVLWKec1bqwZ9fgQDBMZ3mksoBWNrGwoiQvHwkDuU2PpCPUBsGJMJEICiNvIiyt9r80iBIYnocUrzrlInKAEWGDvPVVmZSX2ER7cEzX4APPWh8cxEaR4hdksDZCIbV1FCB3chBbu7NUBQFpiImpDdhAYsJDzPbsMyjJhuGFusjvwdnOaLZYq1EGEicMpZrATk0j8Uoo6V2wwlTt4IaMvFyg3uorgK5y5AQbLEKP68EUnG4OD3cvpoOxS3DicG/e5EN2PGZaidp3eUlVVVjwr44xzYUk78ssVDXb4tRrqDNmYSvTrObGFXRzSAOAMg9RYwgH6L+8+aSaBsQGZgekwcVyfRYHtZU0mqslgSzhX+k/FqRD1LctVYwJ8UzhRe6JBh1+LzambFfjG0njCdrSGWNkGSMZ43QSAYsO7JaR9iNMZdemCqGXocwwCrzwsi8xoAC7HlJ/EzXxelJwroxnuwtm5L7g8tnxc7GYCPp8vFhy/VFpUCyLST9dDPGGbDeaFYajTe4ODvEauESxP9LCTyPCdfWD4Luqz1kSYUjQ6rr5OxWNFO8SvF1TLFQ02+M5SeFK3OOYpwDGqmKeZAAQDIBa0oqvTHr2D78w2xwuBEQ4mzIwG63mTMlzt6FOWe/IdEVnPl5c2vnNZZyewHIycEKGoIRXOZC2I5tlseHFf1rhsQTHD1KND+jPrHNessHHHqs9pr/tuulzKcpE28y3tHFzt9xhFS8uRMa5EACAq2WPTetbrwyV4I/FdS7QJ8BKvnMkPmtGWiIrP3DyKipnCDVNc29vZuoiXHb/3PBpnknNbuLixlBJCPgr0BS1ucbDntOoT0cLgpQUVCLnEVTI7iBPR6kO3PoJSMYzyQ42+K2ucqfb23M0x4lnQ4i2ZXW/poF3mu/65YhusE7ywIwpn1Ilbl15RGDREq0/dyXVLHupczQsGZ/3oZisAJVGBC8WtHn/BMxhYJ7LYihqGiWhBZ91Ysk3pI33R2dflK7ZtgMh1P/j0TqB1vwTk2seZXwNwDCDogCuVbqK/7Tlzojl8j6jFFCeiUzzvlj6+c85hxWnI7qUNPl50YIBRGIgq8bgHKBf9Gjd90l2SNEq0TYKX0lUsrQ3SdYGp6HQ80drHs5TO5hbDlbTx6VgWARgrgNS7LjCwA6IWTo0R4ysMgliCgR0SvLMhB8+KmSHaSDxRRLMxL/x38ACDMQ+OkamhNNyCVrgw47ReMqflXLIGb0QzyvDMo7AlavGEdbQsaODg0zGX/bk7PMrH1o9U8Dk8ovV92ivZ+RLP4+H1gDf2RBs8sylhO5rZLw9gJDQQ+HRzWnAG7EOMNjke674CSFFS5+IqDCvfShBD6AwN3rBerxfUWwZWdTGe5GTYmohifLp+QbSJ3AQXVgtA1fe09jAnG3fCLdYp3EywjM3xRk+0xTMZ4MzFk2DOIK2y4Ph4tSiNZLgp2eMQlgJyBJMxVLnHbQ1ABaLCQz2JZXP8qYdRma2Z3DFMhN5jbMGZJFF021Rl3LUKhjuxxe/gD/btRDlNKAzD8HfYDrLKriAi7uh3/9dXwbYGxEbTZTpNn8lMZhKN8Z1jwMOf9f7EJl9Qok+1cL2UqmHAWVJN16oa4rvD5nOMgR9Jxqk43dUSgQ6oOaBiaMH4pOb4ylsHZ1afIpZsY0WweBIYcGYIUyCfY2Cd8CQjw/AnVrrYVmytgpnimv/6/LdeswoBMTaLlq6isavrroUjFUCYRtawZ/u37hn8KlO/e4aejrfEbBXkhxoXi/tYcKqlQEtoRRfsvNo21Tb619fWA4oHfaNqAA4peib1PBBQqOEbaexjbv7SOYU/QklluEU4MsxxtJGqmFb73gI16jjFJyO3E1ypssosBIBmoc84wCuBYHBU0I9/+6jVLxcwTgRaihYChgbPxYCmQTsDkhP0/aV76L/PkmSBlpoZriqBGYbWCbYbACcbn5tkawqjSKPbNbABuVnzCKD6X+siFhEXCjrrNe6IUxxLQPAzHwQ7CcnCq+ICHalixJI2ADP+pOdWX60VTT+SzY6xg1aeHCTu+IxzAMEWn1pGLpX4NiWlB2a8aD9rmo6b7FhmgFP9q9tXzzo0vCrRCpwVF0DU9Ld/7VLGExTbz/1CvDDZ2sys6w6pODHVC7JfC/airvfl3znQ8UctuMxYdbHcFDoLUfLibOEtocY1/gOknpEJgNQGoAnHtm1fYsjgp3tTOG4TcwZ4Ki5yRfExarX81zeyRlnlrHveU1yZmjwbEAsBaw1RkKWOEfp5hW9kEASqjj/E8Q1lbtgWOqGNn2BFiho6aCUOnpBdR8rSeoqOAmgaDEsYNgCxIOcYI082riYGgDxw8Jr1ppOgJ918F+LeVN3wq6Zwc3j9faOweGt1TFxTx0OHDRmfGJeugwlNPGFFstaxYoSW4wL22orMwENHmgKjospDZw49nUAkL68R5cSLdf+r9mzLiypzcwwJtWJcKql0rHS+I7mrWOINywj2MTtVxc6p8DFuzjiQwNQuGZdL2niCtSG5QMEZWsYUUKzkaOBdWdl1dAy0d4GLl5kxyeauikKePNzzNoyPt2/YzegwtqzIuLuVLrWsIbnPMUJlZeIqikkaeIpdxvFkTvVaC0AgtxZu8hSj9F0XeKoACENoAi9TRv8ZRTRc4Z5sWMtevTPJDYYC8txbjqxH2suYIb4JYzJ5/jqG6TRdExkCeDN3m5Tl7uHPsaoDLiJbiGAKQ+BlE7YMDKyo4o7V3F1Q8pqxYQu7/0W5HJ32KXqdVTLDk9LIdnK0FB2Y+BFaTmhZvDhP8UC49HBhaaEOzPCRWhXJk0TfjBGGnJrLHAMhWWMoHSQ8kLQxoJ96i0BsuMdTxJ5kCYGLpO2cSkCPSjJekEtN4KFs972knX6olpKR3Aj0GAzHjkY27pRcYsgc1MKeLEbGy9R+9w2ekpfV1hXwXGCqtrU06IbqOVu2lvu61vBAXpVTdPyo/xs/XUuvefc3I+Jd+vX48NyB1fu1IrLBgDYcFKuXeMkkhG8Cpq/aMweAUJWaVz4eCOImCKVzmK/xhljsnq7VHRgHdTTe1d6RIUacT+/XmpAU6DOG9ZNY4CW2perATBT+7egSX/e79IfjOWWRabYpcCOiM7Xna0EhuZz+uJZPVgIjZny/lkfSuV9b/Qc5MMdrArWNjOTNef4q5EWs4Ua33TDHVVrK2nKV2+NKbVWxsfFCLZQkVz+uVTw6ZpkU79aS5N3CSUludNyIwsNrolX3elRuI0msRLQ8Jx5uZCLhKT46Wmq4JZDOZ8bBSoPruE2TrbKFaj5dy6tIaj+qJU5khDHCfr9WOHJWJiqSK/wMvQAUBxq+U+nfzVwC0fcr2AoCbN3rG5n5kj3Zs7Vgk6y8H9Q6kJR4zn2tglQwFLDNJfATFt2HjZutjb65gOEB4pp0BjU/FBLfxm2ua2u7OddbVzxdCxnJrXhcSyFj8dFaZsyR7SVnyYsyx8cZOgLAx40/fJwZ4AKQ3Y08DRMbiYJvhDnfknsLredr6WeS88e1MrLGB2v5FSsT99ITL5oQHybDtsYaV3nkuoZr3dVKHORH8fXUX8wQrX284c2qynqtFiYxGU8e1irJ3eu1RG6lRntXiTFmw9ZR4KNmUIBrbl3RdADCVsSg1jTI5noXN2qLwYsS9Dhl8mItqCTP+qNaO7J8oVbP2RUYZ+3Y2skP1xIqoOHCOTq48uZ4Y33AN9NAADAAxZboEf6rtVCSzB7Vqsnig7X2X9g71yVFYSCMfuEW5CbIVRSREVGk3//5tgzqLgR31Nn77Plh1dRMjXpMsNPpNAeGe7CAzkQGHmPORi/fVgHjUs985TB470sPPXnvUwMUlkHiSVv5eV4s7tvaPmOrcxyLz5IwromojHPcY77plTp4hGC8LRiHHtRLbSngL9PAH6UXmCJCHD1Uep82sMTHbWEhMoPTtjqi5rWrvLeOiEob93AaOrOx8ABWWWbeQPZbiIxBV4SYYw4nxtiF5Rquq+XXqQlkWPAP2xJ1+820rR1R/ZotgFdE5OIuavSEroaoXpoMV5QY2gyhJ9RxAK5kC/4cgqutALrxcVsijDAmbTVE3au2kFfi+/YuZkX93sR3YW5ddbu6FTn/lcYg4KskVy9+bAZ4BtgSQ+z62x/6oPbjtsCjPjMo2zoSnV62BZO+PzT94oGlR0oDNkvRshRujQAKzlhafxHPpYyAgRuaWAyt9I/bEmHEnk3YMojIetkWmncWTmxFUisfCdNYp2naj606SKzEzZYJULhGol20KJ5YRX/Fi7s2HLRYUWFzYKu9aEt6W4FsS4wO93Vb4XtbOqx4bF2rtVSmmoUrpuJaFS8S9OQL19bHDWZosb3+71uGRwk+ausWRhxkW6wlal63NaPxUW7uY4AVPTLXQ+oGeXdm2mG6Kpo5ptE3RH2K8GpnvmIZoKuW/ZotKaFMG0eyJTrk5C/b8qTsTJ1hyOqRub5fs8GLzQ4OXwRtFOMOc+qpFJUBcDJb7dPTWMx+gC2siWgl20qIKH7ZFpfm2bbDEFcM6ncwh9PyAIFflDnuoFVVU9GZ2vFUQ4emAlB8IPTA3Lp8JgliSkUWbE9EhWQLO6KT96ItMWKzUYI6kUfBDM+QLHDB36e4C9M2ROuIoiJkADfVa89PJhZ7K/bEM8oDhp8mm0Ic7jXWyM33ba2lcouQGklo5D/bQ1e3+1Ifb7PAHfyOznPculTyhHOOS+iP3LHDBE8wpxRjjElbSKfnorPP3tt9hd8Sbdj4b5JxvnGHZ2Au/IAxOxSf5d0UVUz74mtGRldVXJsuJq1jzn08gU01JJpJW/p5ikpmvE4uFrbHto5yT45cBHZfYR2R+5wtGwtxws4XA22vY5Ikx1esmge3viQqLWdRVNh4GIWi6RywCQmvIqKtPpw/be1MnZCoxmkZyemJaDuMiyuGp3D7Lpuq0wdsKd7FOGZcuXXvzmglLhE7C4/BusnZNZ+0Bacgok2IG9aKJpYQ/ubb3Vxm74kmujJ1RJTe/NgRRTM8R8wwS3QsIfDKEJMwk0PgBWZoLexbR3qXttCrx3eeuFifTZQwBpO2wIKIiKr13GNg3G2odSGR7ESN29G1F5obNyURRWt9crpTt2B94pOoPOBJnCAHmHGVbJ/4vab8IkrTDGa50GxAgcCvEsCqHizuOXTUE0lnjNnOvON3G5HgdB5mmeR5UZc0postyKxJ5WpNZXNMi0jsuzyNrgZBwL8J4aYLdBsRJswtsAAwOn7ru+uLh6x46Kk9+0YuWeG4g784Fl3bdkU8Z5Cw7CGLhPuYxCj6RuRFVVZ1NsPH8TdbTDK/dFU+P2YUffLjUVcOZGAMf7Nt22HatWQrJjr+BU3rfgVVpLKhK3GxKdiKdCRhn6umdEN/+p1RfgFO0WyqtSZXD+gHKvtoAzzb0d/Rv+4nw+oVZhEv7KGtVgPWlDoBzhTU0x7wuXFLB0iLY4ort4Od68i87Df2+S5lQ/QXtCf9mdQBgDyiOSR4EjtA/+t9e77Oa8ofc0uU3wKLTAAabTCByiFYRaW3EtmBT84sYgCPohODxLWoRl1TqIvw+rPHEHYLIKW3nSzCMyAIk5UBn/7bAuwTgF2N+A0jWAbMVM1I1X42/gG3QvnlWNIOAwcqDZqGEa4HzQUWmtLLi6O/oKXrD+Z41EcnYWKg8HAwxlo1IADflly9iq0/3UQ8RBvVxzc0pQ81gXbEkCWAN+zeePIXtL39acx2FDUGxxWNFLB4Wc1GVhMAmrrT4X1SWyysy7bedmINcy23YZvSASxXrhIHqkO+3i7ZRAtmf/6vt9XwaxrQpobJAIWOsiwzFIc2EkisSgYsSqr+4FtZ/BCY6SpZsKVLuY1p8YNhhPxEcviwdMQ2rZzlZSfy+hPKn6IjnlbSPn7zcCFXomgib6X2h1f0ACM4lewQEX2OXFdIdYIbtqK+JSptHIywgUwHYKmSrXXe0qn5E+6u9vPZfynvTJdbNYIofGZlHVYhQCCEVrA87/98iUCAJSHnJlWpcJ3vj2xTLltHMNA9p7sZRkjK7TyR8blKxZPJZA2wXjb/ueBYEMv4qW2m4o+TwJte+pn0VDeWoXosLSg8rAGJjlAAJMGAECpjv8EgfZpmsQDZeu/CGU/glbN+P6V3SxLCEhvqmNrsq402hg+wu7wSwJiIjuzbnXW3/CxX2JW9K72eOVTlBOS8mW9tyt+6VpFYDCEiHuS+P0pf6QzxqBZyAM1pKmghdPcbjONhnRe01HS2o8aFRLP5lNM3ZrgS1A3XOXIXJEvE5DiLQN1x9jLr3D64YcW9zPby1611txFT64pgbmRhedAOXkm+sXfVRFBamiQD4KZqrLZJbVgSXjzNTCd7AL9XDLTVPRIviJPWapXiFfObqyZqCQCRuJ1IlIw2vDJAS+6zOR3eOT8ABOHyTylDTN7GXq8Yr7hHff24BngkPcY4OaLc8zdyFSWVd+tMFfkYOB5gS8Ch3MklALAYIO1v0OctHcQhfhzezCTmq1RFtQ2vWs9Zhx2XbPtdU4LvcE+xnFx2DFBmZ5q8HyQg9cGyPCwWYdsBUNy9gN59SqP+sPCEF7dVHycHL7UaexLrKwcA5eAbIs7k5P0MAeTW1LzLBEm3cm35NFlqeBjsb44jf7BPuxar9NV/U64QHfXcFtahMOvSuyeyEoG3tF4mJ19x92Up71UslY9Nu0YHkdlCT7CbpezK2lWEO4I2SPXu3aaz1tcNnhEEgwtQ72rji++WSY4BmxmU9mJaYwMFWtVhetRnw6KSYECu0mUuYG6qtT7r1QFfMHOKWbzTXGZAKNzgqXVYTRvzoouZPYY7IVk7gzd2vR7/1EWft0Us1+SxrKVazrO8zAlGjHQ1NJiZsJI1npharMz542Hf2mwlW63ZRgwtITbMhz8M8HbgGBWxZ0yN67kpgPqylLax9bQwEVVsj51hQ+EBk0kbM6zP6vVnBzRXfWevr6y7DgFJLIdQ3Li9xOsKrYcXJJ+LD7Su6nwJC5g/9aBKr+f9x/wjaaDKMArwDGkNPJNAXPTEtfZgmvBMjNUVagOi6gtOcx2//XiuD+AuqWP8p9DddUtdsNUFPW6nSxOetV75GCGWkozl6XZbhJGLR6gNwFJhWreZ491PLlJq/RFXesWT0iCMRzaIBODYQ9NFZewljvoyI5fFX4fgVnpL8N9SdR99GZgtnvBUsTfH9kXMFFOqnSbJ4zmWs6RIHGMTENezIt8iSARgqE00lnY4nz5gMq7i4Tr04jS1Uc7PY7WilwSqqnSB/5buetlnbmAInoc0CdvwT5Jc8oNpb1i/pdAogkeIxXJqYiCuHt+HOBjtvWzrs92gw68BwLNxQ7oIqHXKAftz3nRkrvHIkdmVlvhPEVF8u0Sya4sHhGf5st6trqeWpkVkiEkoJ7tXoDSU9tZy1hK/DPBAFgNI9wZGuD9J4SPIN5/sAC8mb3LIzyPgqQO3XESSq9BXGxOuz/IsyaTTGBsCZJ4ZMUppTrkfUeUhoN44Kz9xgjIEIFiEB0IOtBsEJlexLzq5TPQICSsXF1YCvMA7EjxAsBAOeuVgwKM0tsjsvy2M+pJTyvi6nsRtTh9mrxzdPMqVEF9xblqGdVBKHQSi/qSENJhP6pLaQK4V3mBGWCRWOUWzORd4IsOAIztVJC/OjLvoSWWcMA8AifmDyuXqGGDEYFnOiiJXTnaUxN1mfgSAfdM0LsfCMRVeUcEQ3Zp9npwbYHAj1X0v9gDcOJMe4NEII27oH3ehjS8EVuObRmZgfXQOaujHIDEPX/o+T2tmEZ4RDDfWrF99AL9xnV5cydby866Ew6TxNULKCaAqfZLPb7q204snlQjuN2WKedylz/UpSzfDC3YoHZab6OCBIyED3LEuKxaMyUMpLedeK+Z0L0SdtT6X3HTHtS/X+4MIG5oxatx+xyF4w9IH46tGlvP166M8hDkNtTBCq0OWMGNUT7HjxQQInQLycxd37qp9tdvpqt4KM3fNaJhz9x6JhcOVwF/hGgQTXNuAG1EW28NxntYytDqlJBf9fI6wLoqipY4NFGHTV7UahOI7fqCLcrMKAaBTjMrh2SO4JCxnxc0U6T2F5m3qA4g8oESC92zaSB7zZWYB/zn1zsWAe6CUxZYAWkAUNMnz9HjwOyLHUSzmHkgJgIQqMcHwFqPSjdjr/VKT8v+QTZXiAbdh+eWDOU1peQQiUX4kw/q4r5lJELjoS+pIs4GxxjuCSp+JZVf6p9W/Wh/ZUJpMpkbwxIs/laQ0r+tcxge7PySLPl4wuheGt3BdGc2euPTHTTW1j9tGECupA4z4FmAnXJqQBCP1kHWMwrSlHO8hFkGrf6d9/V+HX/b72sdXQtGbkQM6CmCYWvv4dc56t5hY+l/GLfs07LijaH76SusIv85V6/+HexJAkMsoUlSMre7O8Kpqg1/nQ//QS3EeghHvqi//ILG7+Mf5f4dY6+Lv32y3P+3h9Bfh//tq8r+DOO0bvOEPgdeOPzDiuCcAAAAASUVORK5CYII=';

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {

    credits();

} else {
    alert('The File APIs are not fully supported in this browser.');

}

//GETS THE LOCAL STORAGE DATA
function getJsonlocalStorageBK() {
    var tx_backup = "";

    var js_backup = [];

    for (i = 0; i < localStorage.length; i++) {

        key = localStorage.key(i);

        val = localStorage.getItem(key);

        tx_backup = tx_backup + key + " = " + val + "\r\n";

        console.log(">>>>>  " + i + "  <<<<<< (key=val) " + tx_backup);

        cur_js_backup = {
            [key]: val
        };

        js_backup.push(cur_js_backup);

    }

    js_backup_str = JSON.stringify(js_backup);

    return (js_backup_str);

}

//LOADS THE UPLOADED STORAGE DATA AND ASKS IF WANNA REALLY PROCEED
function setJsonlocalStorageBK(backup) {

    mybackup = '';

    try {
        mybackup = JSON.parse(backup); //HANDLE THE WRONG FILE LOADING
        console.log(backup);

    } catch (e) {
        return false;
    }

    CUR_NMNML_BKP = mybackup;

    console.log(mybackup);

    //clears the content to prepare it to receive the keys list
    document.getElementById("dropthebackupfile").innerText = "";

    TR_cleanup("backuplist");

    TR_info("Ready-to-load drawings or db objects:");

    //FOR EACH ELEMENT SHOWS IN THE backuplist
    mybackup.forEach(showBackup);

    //ONCE SHOWN THE CONTENT YOU'RE GOING TO LOAD, IT ASKS IF YOU AGREE...

    questiondiv = document.createElement('div');

    questiondiv.innerHTML = "<div style=\"background:#fdf6e3; text-align:justify; \">Do you really want to load the diagrams listed <i style=\"color:black;\">in black</i> on the right?<br/>Note: if you press <b color=\"red\">'whole backup'</b> the whole current data will be replaced by the backup without any check, including the unchecked reserved files  <i style=\"color:red\">in red</i> in the drawing list.<span class=\"BTN\" style=\"position:absolute;bottom:0.3em;left:0.3em\" id=\"BTN_CANCEL_UPLOAD\" onclick=\"cancel_upload()\">CANC</span> \
        <span class=\"BTN\" style=\"background:#f00; color:#fff;position:absolute;bottom:0.3em;left:25%\" id=\"BTN_WHOLE_UPLOAD\" onclick=\"importBackup(true)\">WHOLE BACKUP</span> \
        <span class=\"BTN\" style=\"position:absolute;bottom:0.3em;right:0.3em\" id=\"BTN_OK_UPLOAD\" onclick=\"importBackup()\">YES</span></div>";

    console.log("getting the NOMNOML.FILE_INDEX content.");
    file_index_object = JSON.parse(localStorage.getItem("nomnoml.file_index"));

    //if no index exists, drives the user to load the whole backup
    if (file_index_object === null)
        questiondiv.innerHTML = "<div style=\"background:#fdf6e3; text-align:justify; \">Do you really want to load the diagrams listed on the right?<br/>Note: it seems that the local nomnoml database is empty (maybe never used or maybe you cancelled the cache for this browser). In such case click on <b color=\"red\">'whole backup'</b> to load the backup in the localstorage, including the unchecked reserved files  <i style=\"color:red\">in red</i> in the drawing list.<span class=\"BTN\" style=\"position:absolute;bottom:0.3em;left:0.3em\" id=\"BTN_CANCEL_UPLOAD\" onclick=\"cancel_upload()\">CANC</span> \
            <span class=\"BTN\" style=\"background:#f00; color:#fff;position:absolute;bottom:0.3em;left:25%\" id=\"BTN_WHOLE_UPLOAD\" onclick=\"importBackup(true)\">WHOLE BACKUP</span> \
            </div>";

    document.getElementById("dropthebackupfile").appendChild(questiondiv);

    //IT READS THE SAVED DATA AND LISTS THE KEYS
    function showBackup(current_object, index) {

        //lists the keys
        var chiavi = Object.keys(current_object);

        //typically it will do it once, i is just zero. Maybe I'll remove later, maybe not. Depends. On the evolution.
        for (var i in chiavi) {

            reserved = "class=\"checked not_reserved\"";
            if (reserved_filenames.indexOf(chiavi[i]) !== -1)
                reserved = " class=\"unchecked reserved\"";

            filename = chiavi[i].replace("nomnoml.", "");
            newli = document.createElement('li');
            newli.innerHTML = " <b " + reserved + " >" + index + " - " + filename + "</b>";

            document.getElementById("backuplist").appendChild(newli);

        }

    };

    //everything is fine, return true
    return true;

}

//IT USES THE CUR_NMNML_BKP GLOBAL VARIABLE, ASSUMING IT PREVIOUSLY FILLED WITH BACKUP DATA
function importBackup(whole = false) {

    for (const[key, value]of Object.entries(CUR_NMNML_BKP)) {
        console.log(`${key}: ${value}`);
    }

    //SETUP THE DATE/TIMESTAMP VARIABLES
    date = new Date();
    tsff = timestampforfiles(date);
    tsfi = timestampforindexes(date);

    //prepares the info area
    TR_cleanup("backuplist");

    //IF NEEDED TO IMPORT THE WHOLE BACKUP, CLEANUPS THE LOCALSTORAGE
    if (whole) {

        localStorage.clear();
        TR_info("<b style=\"color:red;\">The local storage has been cleanedup because of the whole-backup loading choice.</b>");
    }

    //header

    TR_info("Processed drawings or db objects:");

    //Iterates each saved item
    for (i = 0; i < CUR_NMNML_BKP.length; i++) {

        console.log("importBackup() examining the item " + i);

        current_nomnoml_key = CUR_NMNML_BKP[i];

        key = Object.keys(current_nomnoml_key)[0];

        val = current_nomnoml_key[key];

        console.log(i + " >> " + key + " >> " + val);

        //IF NOT NEEDED TO IMPORT THE WHOLE BACKUP, THE FILE_INDEX AND LASTSOURCE MUSTN'T BE DELETED
        //TODO: OPTIMIZE BY SETTING AN ARRAY OF SPECIAL KEYWORDS AND ITERATE ON THAT ARRAY TO SKIP ITS ELEMENTS
        if (!whole) {

            //IF GETTING THE INDEX DATA, SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
            if (key.indexOf("nomnoml.file_index") !== -1) {
                console.log("(importBackup)BEWARE: Found a nomnoml.file_index item >> skip to the next record");
                TR_info("🔵 " + key);
                continue;
            }

            //IF GETTING THE LAST SOURCE (LAST DRAWING) DATA, SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
            if (key.indexOf("nomnoml.lastSource") !== -1) {
                console.log("(importBackup)BEWARE: Found a nomnoml.lastSource item >> skip to the next record");
                TR_info("🔵 " + key);
                continue;
            }

            //IF GETTING THE UNDEFINED DATA (TYPICALLY WHEN ONLY ONE DRAWINGS HAS BEEN SET IN NN), SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
            if (key.indexOf("nomnoml.files/undefined") !== -1) {
                console.log("(importBackup)BEWARE: Found a nomnoml.files/undefined item >> skip to the next record");
                TR_info("🔵 " + key);
                continue;
            }
        }

        //IF GETTING AN EXISTING DATA, ASKS IF IMPORT IT ANYWAY (if in the WHOLE case, the db has been cleanedup)
        if (Object.keys(localStorage).indexOf(key) !== -1) {

            console.log("importBackup()  the item " + i + " already exists in the local db.");

            backup_keyname = key + '_old_' + tsff;

            confirmmessage = 'The "' + key + '" already exists in the localStorage.\n\nDo you want to import it anyway from the backup?\n\n(if so, the drawing currently living in the localStorage will be renamed into "' + backup_keyname + '")  ';

            if (confirm('The "' + key + '" already exists in the localStorage.\n\nDo you want to import it anyway from the backup?\n\n(if so, the drawing currently living in the localStorage will be renamed into "' + backup_keyname + '")  ')) {
                // backups the old one and saves the imported one:

                //1. saving the old item with a renamed keyname
                importTolocalStorage(backup_keyname, localStorage.getItem(key));
                //2. adding this renamed keyname
                addIndexItem(backup_keyname, tsfi);
                //3. remove the original item with such keyname
                removeIndexItem(key);

                //4. finally importing the new value...
                importTolocalStorage(key, val);
                //5. ... and adding its necessary index BUT NOT if I'm importing the whole backup (the index has already been loaded)
                if (!whole) {
                    addIndexItem(key, tsfi);
                }

                TR_info("🟢 " + key);

            } else {

                TR_info("🔴 " + key);

            }

        } else {

            // just saves the imported one
            console.log('Going to save to the localstorage.');

            importTolocalStorage(key, val);
            //adding its necessary index BUT NOT if I'm importing the whole backup (the index has already been loaded)
            if (!whole) {
                addIndexItem(key, tsfi);
            }

            TR_info("🟢 " + key);

        }

    }

    document.getElementById("dropthebackupfile").innerHTML = "<span>Done.<br/>Please reload the page and briefly check if the backup has worked as expected.\
        <span class=\"BTN\" style=\"position:absolute;bottom:0.3em;left:45%\" id=\"BTN_PAGE_RELOAD\"   onclick=\"page_reload()\">RELOAD NOMNOML</span>\
        </span>";

    hide("BTN_BACKUP_CLOSE");
    hide("BTN_ABOUT");
    //hide("backuplist");
    hide("downloadthebackupfile");

};

function hide(what) {

    document.getElementById(what).style.display = "none";

}

function show(what) {

    document.getElementById(what).style.display = "block";

}

function importTolocalStorage(key, val) {
    try {
        localStorage.setItem(key, val);
    } catch (e) {
        if (e.code == 22 || true) {

            msg = "For some reason the importBackup() function wasn't able to add the backup to the localStorage (maybe full?). No Backup has been loaded.";
            alert(msg);
            console.log("importTolocalStorage(): " + msg);
            return false;
        }
    }
    console.log("localStorage.setItem should have added the '" + key + "' value.");
    return true;
}

function mix(source, target) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }

}

function addIndexItem(key, date = 0) {

    //lazy: issue when a drawing name is "nomnoml.files/"
    cleanedkey = key.replaceAll("nomnoml.files/", "")

        //IF GETTING THE INDEX DATA, SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
        if (key.indexOf("nomnoml.file_index") !== -1) {
            console.log("(addIndexItem)BEWARE: Found a nomnoml.file_index item >> skip to the next record");
            return;
        }

        //IF GETTING THE LAST SOURCE (LAST DRAWING) DATA, SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
        if (key.indexOf("nomnoml.lastSource") !== -1) {
            console.log("(addIndexItem)BEWARE: Found a nomnoml.lastSource item >> skip to the next record");
            return;
        }

        //IF GETTING THE UNDEFINED DATA (TYPICALLY WHEN ONLY ONE DRAWINGS HAS BEEN SET IN NN), SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
        if (key.indexOf("nomnoml.files/undefined") !== -1) {
            console.log("(addIndexItem)BEWARE: Found a nomnoml.files/undefined item >> skip to the next record");
            return;
        }

        //nomnoml.file_index contains a date in the format produced by toISOString() function
        if (date == 0)
            date = (new Date()).toISOString();

        let newItem = {
        "name": cleanedkey,
        "date": date,
        "backingStore": "local_file"
    };

    console.log("getting the NOMNOML.FILE_INDEX content.");
    file_index_object = JSON.parse(localStorage.getItem("nomnoml.file_index"));

    console.log("Current NOMNOML.FILE_INDEX content:");
    console.log(JSON.stringify(file_index_object));

    console.log("Attaching the following item  (" + cleanedkey + ") to the NOMNOML.FILE_INDEX:");
    console.log("newItem " + JSON.stringify(newItem));
    file_index_object.push(newItem);

    console.log("Re-Save the new index into the NOMNOML.FILE_INDEX variable in the localStorage.");
    importTolocalStorage("nomnoml.file_index", JSON.stringify(file_index_object));

}

function removeIndexItem(key) {

    //lazy: issue when a drawing name is "nomnoml.files/"
    cleanedkey = key.replaceAll("nomnoml.files/", "")

        //IF GETTING THE INDEX DATA, SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
        if (key.indexOf("nomnoml.file_index") !== -1) {
            console.log("(removeIndexItem)BEWARE: Found a nomnoml.file_index item >> skip to the next record");
            return;
        }

        //IF GETTING THE LAST SOURCE (LAST DRAWING) DATA, SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
        if (key.indexOf("nomnoml.lastSource") !== -1) {
            console.log("(removeIndexItem)BEWARE: Found a nomnoml.lastSource item >> skip to the next record");
            return;
        }

        //IF GETTING THE UNDEFINED DATA (TYPICALLY WHEN ONLY ONE DRAWINGS HAS BEEN SET IN NN), SKIP THE FOR AND GO TO THE NEXT ITERATION STEP
        if (key.indexOf("nomnoml.files/undefined") !== -1) {
            console.log("(removeIndexItem)BEWARE: Found a nomnoml.files/undefined item >> skip to the next record");
            return;
        }

        console.log("getting the NOMNOML.FILE_INDEX content.");
    file_index_object = JSON.parse(localStorage.getItem("nomnoml.file_index"));

    console.log("getting the index of the object to be removed from NOMNOML.FILE_INDEX content (the one with name equals to '" + cleanedkey + "').");
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    index = file_index_object.findIndex(index => index.name === cleanedkey);

    console.log("loooking for the index in the " + index + " position, where it has been just found the name equals to '" + cleanedkey + "' and removing it.");
    file_index_object.splice(index, 1);

    console.log("Re-Save the new index into the NOMNOML.FILE_INDEX variable in the localStorage.");
    importTolocalStorage("nomnoml.file_index", JSON.stringify(file_index_object));

}

function cancel_upload() {
    console.log("NNB.cancel_upload()");
    document.getElementById("dropthebackupfile").innerHTML = MSG_upload;
    //rowup is defined in the manin threadcode
    document.getElementById('dropthebackupfile').appendChild(rowup);

    //cleanup any list of drawings
    document.getElementById('backuplist').innerHTML = "";
};

//CREATES AND ADDS THE ICON IN THE MENU

var tapebutton = document.createElement('a');

tapebutton.setAttribute("title", "NCBS - Nomnoml Complete Backup Solution");
tapebutton.setAttribute("href", "javascript:void(0)");

//THE SVG CONTENT FOR THE TAPE ICON
tapebutton.innerHTML = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">					<path d=\"M 2.0200632,19.746968 C 1.5668466,19.633572 1.2241477,19.436499 0.87766976,19.090022 0.5121363,18.724488 0.28883416,18.322301 0.20543461,17.879266 0.12532422,17.453704 0.13087982,6.9701543 0.21141688,6.5905814 0.38459363,5.7743955 0.97763502,5.0982078 1.7762053,4.8064047 L 2.1284444,4.6776941 h 9.8626956 9.862697 l 0.317566,0.1199258 c 0.425452,0.1606674 0.856156,0.4952542 1.148192,0.8919559 0.459419,0.6240773 0.428541,0.1798051 0.445658,6.4122362 0.01002,3.648563 -0.0038,5.616276 -0.04069,5.788777 -0.09634,0.450572 -0.324565,0.856839 -0.6761,1.203517 -0.540446,0.532978 -1.081427,0.729872 -2.005377,0.729872 h -0.507373 l -0.227168,-0.961884 c -0.656696,-2.78061 -0.630121,-2.684976 -0.782537,-2.816078 L 19.382119,15.922252 H 12.045331 4.7085436 l -0.13648,0.121929 c -0.1126159,0.100609 -0.2225603,0.425144 -0.6287764,1.856029 -0.270763,0.953755 -0.5049796,1.776776 -0.5204813,1.828934 -0.024571,0.08267 -0.098938,0.09424 -0.5799873,0.09022 -0.3034912,-0.0025 -0.6737312,-0.03511 -0.8227554,-0.0724 z M 4.3466747,14.391366 C 3.551947,13.513263 3.1934696,12.505346 3.2543307,11.320065 3.2877646,10.668933 3.4174257,10.191832 3.7193337,9.6090423 3.8274143,9.4004083 3.9241731,9.2114185 3.9343533,9.1890648 3.9445334,9.1667112 3.5118863,9.1484218 2.9729152,9.1484218 H 1.9929678 v 2.7637222 2.763723 H 3.298565 4.6041622 Z m 9.1805173,0.0271 c -0.329502,-0.353435 -0.566137,-0.709659 -0.776673,-1.169182 -0.548677,-1.197562 -0.457516,-2.75934 0.224279,-3.8423758 0.06999,-0.1111759 0.127251,-0.2148155 0.127251,-0.2303103 0,-0.015495 -0.512102,-0.028172 -1.138004,-0.028172 -0.625902,0 -1.138003,0.00924 -1.138003,0.02053 0,0.011291 0.08621,0.1637023 0.191588,0.3386915 0.252001,0.4184857 0.457984,1.0807576 0.503467,1.6187366 0.106749,1.262637 -0.275515,2.386046 -1.120199,3.292082 l -0.239975,0.257405 h 1.803122 1.803122 z m 8.407931,-2.506318 V 9.1484218 h -0.975432 c -0.536487,0 -0.975431,0.012677 -0.975431,0.028172 0,0.015495 0.05726,0.1191344 0.12725,0.2303103 0.370851,0.589099 0.576293,1.3576179 0.576848,2.1578809 7.43e-4,1.069568 -0.363469,1.997773 -1.109463,2.827498 l -0.254966,0.283584 h 1.305597 1.305597 z M 8.2105146,13.799404 C 8.6186525,13.6467 8.9727342,13.386119 9.2683777,13.020886 10.229594,11.833413 9.816696,10.079972 8.4124268,9.3859454 7.4775765,8.9239171 6.3689829,9.1407999 5.6398315,9.9283701 5.2711408,10.326601 5.104526,10.673109 5.0198552,11.217733 4.7471798,12.97165 6.5418104,14.423746 8.2105146,13.799404 Z M 6.7847383,13.104531 C 6.3867395,12.946664 6.0887782,12.666839 5.8910881,12.265273 5.7350602,11.948335 5.7221049,11.882036 5.7406359,11.495331 5.7837429,10.595779 6.3823804,9.9660441 7.2812102,9.8747281 7.8690713,9.8150041 8.5319605,10.168225 8.830868,10.700462 c 0.4764695,0.848406 0.1683773,1.895744 -0.6872625,2.336302 -0.3738477,0.192489 -0.9695372,0.222196 -1.3588672,0.06777 z m 0.427847,-1.016267 c 0.055027,-0.08614 0.2661194,-0.08777 0.3511803,-0.0027 0.035766,0.03577 0.065029,0.194273 0.065029,0.352239 0,0.157965 0.018289,0.286981 0.040643,0.286702 0.078648,-9.86e-4 0.6096447,-0.327409 0.6096447,-0.374773 0,-0.02637 -0.1111754,-0.113099 -0.2470562,-0.19273 -0.2048401,-0.120044 -0.2441944,-0.168604 -0.2303103,-0.284184 0.02801,-0.233162 0.1652647,-0.273206 0.4546096,-0.132631 0.1389438,0.0675 0.2679652,0.107347 0.2867151,0.08854 0.044511,-0.04464 0.038876,-0.607235 -0.00654,-0.652648 -0.019227,-0.01923 -0.1183729,0.01659 -0.2203239,0.0796 -0.2086411,0.128947 -0.3636696,0.145649 -0.4597843,0.04953 -0.1187984,-0.118798 -0.067461,-0.259461 0.1495109,-0.409654 0.1179968,-0.08168 0.2074856,-0.172672 0.1988644,-0.202203 -0.00862,-0.02953 -0.092971,-0.09884 -0.1874443,-0.154013 L 7.8455569,10.439021 v 0.21788 c 0,0.125818 -0.035982,0.253861 -0.085157,0.303036 -0.1057898,0.10579 -0.1321167,0.105865 -0.2821197,7.97e-4 C 7.3810042,10.892604 7.357841,10.824028 7.357841,10.604191 v -0.272187 l -0.1761196,0.03696 c -0.2103215,0.04414 -0.5941473,0.24644 -0.6202135,0.326898 -0.010192,0.03146 0.080835,0.113043 0.2022812,0.181299 0.1943591,0.109237 0.2188234,0.144581 0.2042169,0.295043 -0.021329,0.219706 -0.196919,0.253701 -0.4822105,0.09336 -0.1275702,-0.0717 -0.2166206,-0.09388 -0.2380005,-0.05929 -0.039933,0.06461 -0.050525,0.592988 -0.012646,0.630867 0.014176,0.01418 0.1394547,-0.02946 0.2783985,-0.09696 0.2983953,-0.144972 0.4378636,-0.09728 0.4378636,0.14972 0,0.127343 -0.042408,0.179002 -0.2334614,0.284393 -0.2289295,0.126285 -0.2315593,0.130925 -0.1354766,0.239021 0.053892,0.06063 0.1955279,0.154547 0.3147473,0.208706 l 0.2167626,0.09847 0.027665,-0.282242 C 7.156864,12.283016 7.188785,12.125524 7.212585,12.088268 Z M 17.362229,13.801837 C 18.48696,13.381021 19.148,12.173435 18.879337,11.030391 18.764781,10.543007 18.636145,10.304128 18.282618,9.9222781 17.324937,8.8878678 15.78914,8.884198 14.806901,9.9139731 c -0.895479,0.9388159 -0.885661,2.3681189 0.02264,3.2963809 0.6698,0.684517 1.663666,0.916625 2.532684,0.591483 z m -1.422945,-0.701956 c -1.365983,-0.52532 -1.415219,-2.45867 -0.07832,-3.075589 0.841376,-0.3882584 1.907783,0.04557 2.230189,0.90728 0.510977,1.365711 -0.801072,2.687788 -2.151864,2.168309 z m 0.360012,-0.662087 c 0,-0.308588 0.06351,-0.417268 0.243858,-0.417268 0.180344,0 0.243858,0.10868 0.243858,0.417268 0,0.157965 0.01317,0.28721 0.02925,0.28721 0.07569,0 0.442022,-0.217012 0.529351,-0.313579 0.09586,-0.105996 0.09292,-0.111145 -0.135476,-0.237134 -0.191054,-0.105391 -0.233462,-0.15705 -0.233462,-0.284393 0,-0.247004 0.139469,-0.294692 0.437864,-0.14972 0.138944,0.0675 0.266517,0.108841 0.283497,0.09186 0.04311,-0.04311 0.03108,-0.546772 -0.01483,-0.621061 -0.02627,-0.04251 -0.09183,-0.0276 -0.21595,0.04911 -0.212993,0.131637 -0.439264,0.14304 -0.484779,0.02443 -0.07301,-0.190256 -0.02825,-0.28929 0.184872,-0.409072 0.11977,-0.06732 0.209321,-0.148129 0.199002,-0.179587 -0.02244,-0.0684 -0.415304,-0.298895 -0.511601,-0.300163 -0.04413,-5.8e-4 -0.06774,0.08276 -0.06774,0.239096 0,0.145915 -0.03338,0.273367 -0.08516,0.325143 -0.197155,0.197156 -0.402559,0.02825 -0.402559,-0.331018 0,-0.239801 -0.0036,-0.24496 -0.145719,-0.209289 -0.156579,0.0393 -0.450378,0.229271 -0.450378,0.291218 0,0.02074 0.09852,0.09833 0.218925,0.172429 0.186917,0.115026 0.216627,0.15849 0.203214,0.297294 -0.01282,0.13266 -0.04334,0.165747 -0.165881,0.17983 -0.08624,0.0099 -0.231639,-0.03309 -0.341542,-0.101015 -0.105253,-0.06505 -0.205168,-0.104475 -0.222032,-0.08761 -0.04293,0.04293 -0.05237,0.615102 -0.01083,0.656863 0.01875,0.01885 0.147772,-0.02096 0.286716,-0.08846 0.298395,-0.144972 0.437863,-0.09728 0.437863,0.14972 0,0.127343 -0.04241,0.179002 -0.233461,0.284393 -0.228324,0.125951 -0.231307,0.131166 -0.135534,0.236994 0.09312,0.102901 0.431434,0.306222 0.518019,0.311324 0.02235,0.0013 0.04064,-0.12685 0.04064,-0.284815 z m 5.093921,-5.240388 v -0.65044 l -9.415624,0.0137 -9.4156234,0.0137 -0.015267,0.6367401 -0.015268,0.63674 h 9.4308904 9.430892 z M 4.4560001,19.674954 c 0.018186,-0.08196 0.1990838,-0.734284 0.4019959,-1.4496 l 0.368931,-1.300575 6.805946,-0.01376 c 6.447191,-0.01303 6.807486,-0.0087 6.835133,0.08129 0.01605,0.05227 0.172621,0.710784 0.34793,1.463356 l 0.318745,1.368314 H 11.978808 4.4229351 Z M 7.5598596,18.711557 C 7.7339475,18.537469 7.7482972,18.49992 7.7203587,18.291579 7.6542427,17.798544 7.1166056,17.594451 6.7490516,17.92286 c -0.1519408,0.135759 -0.1769747,0.19388 -0.1769747,0.410875 0,0.216996 0.025034,0.275116 0.1769747,0.410875 0.2620914,0.234179 0.5555381,0.222217 0.810808,-0.03305 z m 9.8557644,0.0069 c 0.270902,-0.270903 0.236558,-0.631514 -0.08422,-0.884294 -0.134946,-0.106341 -0.511352,-0.08395 -0.668638,0.03977 -0.439865,0.345998 -0.205098,1.028775 0.353735,1.028775 0.172112,0 0.25154,-0.03667 0.399122,-0.184248 z\"></path></svg>";

tapebutton.setAttribute("onclick", "show_backup_menu();");

//HANDLES THE TIP ON MOUSEOVER / MOUSEOUT
tapebutton.setAttribute("onmouseover", "tooltip.textContent = this.getAttribute(\"title\")");
tapebutton.setAttribute("onmouseout", "tooltip.textContent = \"\"");

//SELF EXPLANATORY
function show_backup_menu() {

    document.getElementById('backupmenu').style.display = "block";

}

function hide_backup_menu() {

    //in case a upload has been ready, it is needed to clear it
    cancel_upload();

    //hide the backup menu
    document.getElementById('backupmenu').style.display = "none";

}

curlogo = document.getElementsByClassName("logo")[0];

curlogo.parentNode.insertBefore(tapebutton, curlogo.nextSibling);

//PREPARES THE MENU AND ATTACHES IT TO THE DOM

var backupmenu = document.createElement('div');
backupmenu.setAttribute("id", "backupmenu");
//backupmenu.setAttribute("style", "padding:1em;font-family:sans-serif; display:block; position:fixed; top:20%; left:20%; width:60%; height:60%; background:#eee8d5; border:solid 5px #0008" );
backupmenu.setAttribute("style", "text-align:center;color:#586e75;padding:1em;z-index:20;font-family:sans-serif; display:none; position:fixed; top:20%; left:20%; width:60%; height:60%; background:#fdf6e3; border:solid 5px #0008");

MSG_upload = "<span>Drop here the backup file to load it</span>";

backupmenu.innerHTML = "<img src=\"" + NCBS_LOGO + "\" style=\"height:4em;\"/><br/><b>Here you can save or load a backup of the diagrams you draw.<b><br/> <br/>\
    \<div id=\"downloadthebackupfile\" onclick=\"downloadbackup()\" style=\" cursor: pointer; padding: 1em;position:absolute; left:2%; top:23%; width:26%;height:50%;background:#eee8d5;\"><span>click here to download the whole drawings (json)</span></div> \
    \<div id=\"dropthebackupfile\" style=\"padding: 1em;position:absolute; left:35.5%; top:23%; width:26%;height:50%;background:#eee8d5;\">" + MSG_upload + "</div> <input style=\"display:none;\" type=\"file\" id=\"files\" name=\"files[]\" multiple /> \
    <div id=\"backuplist\" style=\"text-align:left;overflow-y:scroll;font-size:0.8em;padding: 1em;position:absolute; right:2%; top:23%; width:26%;height:50%;background:#eee8d5;\"></div> \
    <span id=\"BTN_BACKUP_CLOSE\"  class=\"BTN\" style=\" position: absolute; top: 1em; right:1em;\">close</span>\
    <span id=\"BTN_ABOUT\"  class=\"BTN\" style=\"position: absolute; bottom: 1em; right:1em;\">about</span>\
    <output id=\"list\"></output> \
    ";

document.body.appendChild(backupmenu);

//THE SVG CONTENT FOR THE DOWNLOAD ICON

rowdown = document.createElement("div");
rowdown.style = "position:absolute; top:33%;left:33%";
rowdown.innerHTML = "<svg width=\"104\" height=\"104\" viewBox=\"0 0 104 104\">  <path style=\"opacity:0.51099997;\"   d=\"M 34.845703 2.3300781 C 30.292676 2.3300781 26.628906 5.9958012 26.628906 10.548828 L 26.628906 32.927734 L 14.398438 32.927734 C 11.874745 32.927734 9.6282773 31.798778 8.1230469 30.019531 L 7.609375 30.53125 C 4.3899002 33.750725 4.3899002 38.93482 7.609375 42.154297 L 45.769531 80.314453 C 48.989005 83.533929 54.17115 83.533929 57.390625 80.314453 L 95.550781 42.154297 C 98.770261 38.93482 98.770261 33.750725 95.550781 30.53125 L 94.419922 29.402344 C 92.938015 31.533647 90.47566 32.927734 87.671875 32.927734 L 76.533203 32.927734 L 76.533203 10.548828 C 76.533203 5.9958012 72.869433 2.3300781 68.316406 2.3300781 L 34.845703 2.3300781 z M 8.359375 87.076172 C 7.3617055 87.076172 6.5585938 87.879284 6.5585938 88.876953 C 6.5585938 89.874623 7.3617055 90.677734 8.359375 90.677734 L 94.800781 90.677734 C 95.798451 90.677734 96.601562 89.874623 96.601562 88.876953 C 96.601562 87.879284 95.798451 87.076172 94.800781 87.076172 L 8.359375 87.076172 z \"   /></svg>";
document.getElementById('downloadthebackupfile').appendChild(rowdown);

//THE SVG CONTENT FOR THE UPLOAD ICON
rowup = document.createElement("div");
rowup.style = "position:absolute; top:33%;left:33%";
rowup.innerHTML = "<svg width=\"104\" height=\"104\" viewBox=\"0 0 104 104\">  <path style=\"opacity:0.51099997;\"   d=\"m 68.314457,90.677734 c 4.553027,0 8.216797,-3.665723 8.216797,-8.21875 V 60.080078 h 12.230468 c 2.523693,0 4.770161,1.128956 6.275391,2.908203 l 0.513672,-0.511719 c 3.219475,-3.219475 3.219475,-8.40357 0,-11.623047 L 57.390629,12.693359 c -3.219474,-3.219476 -8.401619,-3.219476 -11.621094,0 L 7.609379,50.853515 c -3.21948,3.219477 -3.21948,8.403572 0,11.623047 l 1.130859,1.128906 c 1.481907,-2.131303 3.944262,-3.52539 6.748047,-3.52539 h 11.138672 v 22.378906 c 0,4.553027 3.66377,8.21875 8.216797,8.21875 z M 94.800785,5.93164 c 0.997669,0 1.800781,-0.803112 1.800781,-1.800781 0,-0.99767 -0.803112,-1.800781 -1.800781,-1.800781 H 8.359379 c -0.99767,0 -1.800781,0.803111 -1.800781,1.800781 0,0.997669 0.803111,1.800781 1.800781,1.800781 z \"   /></svg>";
document.getElementById('dropthebackupfile').appendChild(rowup);

//ADD THE DROP FEATURE


function handleDropped(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {

        if (i > 1) {

            alert("Currently only one file per time has allowed to be processed.");
            return;

        }

        var reader = new FileReader(); //t is an async function so we need to wait for its completion before we can use the text
        reader.readAsText(f, "UTF-8");
        reader.onload = backupfileloaded;

        function backupfileloaded(event) {
            console.log("Backup File Loaded Successfully");
            console.log(event.target.result);
            if (!setJsonlocalStorageBK(event.target.result))
                document.getElementById("backuplist").innerHTML = "Error loading the file: unfortunately it does not seem a valid parsable json file.";

        }

    }

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('dropthebackupfile');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleDropped, false);

document.getElementById('dropthebackupfile').addEventListener('drop', onDrop, true);

function onDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text/plain');

    console.log('files: ' + event.dataTransfer.files + ' && data: ' + data + '.');
}

//close GUI
document.getElementById('BTN_BACKUP_CLOSE').setAttribute("onclick", "hide_backup_menu()");

//about GUI
document.getElementById('BTN_ABOUT').setAttribute("onclick", "about_menu()");

// It returns the current timestamp in a format useful for file names
function timestampforfiles(date = 0) {

    if (date == 0)
        date = new Date();

    today = date;

    aaaa = today.getFullYear();
    MM = pad(today.getMonth(), 2);
    DD = pad(today.getDate(), 2);

    hh = pad(today.getHours(), 2);
    mm = pad(today.getMinutes(), 2);
    ss = pad(today.getSeconds(), 2);

    tsff = aaaa + "." + MM + "." + DD + "__" + hh + "." + mm + "." + ss;

    return tsff;

}

// It returns the current timestamp in a format useful for nomnoml indexes
function timestampforindexes(date = 0) {

    if (date == 0)
        date = new Date();
    return date.toISOString();

}

function downloadbackup() {

    backupdata = getJsonlocalStorageBK();

    // Create element.
    a = document.createElement('a');
    // Attach href attribute with value of your file.
    a.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(backupdata));

    a.setAttribute("target", "_blank");

    tsff = timestampforfiles();

    backup_filename = tsff + "_NOMNOML_BACKUP.json";

    a.setAttribute("download", backup_filename);

    document.getElementById('backupmenu').appendChild(a);

    a.innerHTML = '<b style="display:none;">cliccami</b>';
    // HTML5 property, to force browser to download it.

    a.click();

}

// NOT WORKING !!!! INVENT A DIFFERENT MODAL SYSTEM
function TR_confirm(message, func_ok, func_not) {

    if (typeof(func_ok) === "undefined")
        func_ok = function () {};
    if (typeof(func_not) === "undefined")
        func_not = function () {};

    messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "TR_current_id");

    document.getElementById("backuplist").appendChild(messageDiv);

    document.getElementById("TR_current_id").innerHTML = "<span>" + message + "</span><span class=\"BTN\" style=\"position:absolute;bottom:0.3em;left:0.3em\" id=\"BTN_YES\" onclick=\"" + func_ok + "\">YES</span> \
        <span class=\"BTN\" style=\"position:absolute;bottom:0.3em;right:0.3em\" id=\"BTN_NOT\" onclick=\"" + func_not + "\">NOT</span></div>";

}

function TR_info(message) {

    id = timestampforindexes(new Date()) + "_" + Math.trunc(Math.random() * 1000);

    messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", id);

    console.log("------- INFO MESSAGE -------");
    console.log("Infomessage set on element with id: " + id);
    document.getElementById("backuplist").appendChild(messageDiv);
    document.getElementById(id).innerHTML = "<span>" + message + "</span>";

}

function TR_cleanup(id) {
    document.getElementById(id).innerHTML = "";
}

function about_menu() {

    if (confirm("An 'About NCBS' diagram will be added into your current Nomnoml environment. Do you agree?")) {

        JSONDATA = '[{"nomnoml.file_index":"[{\\\"name\\\":\\\"About NCBS\\\",\\\"date\\\":\\\"2020-11-12T22:24:41.212Z\\\",\\\"backingStore\\\":\\\"local_file\\\"}]"},{"nomnoml.files/About NCBS":"#lineWidth:2\\n#arrowSize: 0.6\\n#bendSize: 0.2 /*arrow curves*/\\n\\n#direction: down\\n\\n#gutter: 2  /*padding*/\\n\\n#edgeMargin: 4 /*margins (affecting the arrows end)*/\\n\\n#font: Open Sans\\n\\n#.question: fill=#8f5\\n\\n#.internalcheck: fill=#58f\\n\\n#.explanation: fill=#fff\\n\\n//Definitions\\n[<explanation>❔ info NCBS]\\n[❤️Nomnoml Standard]\\n[🖭 NCBS]\\n\\n//Details\\n\\n[<explanation>❔ info NCBS\\n]->[<explanation>Nomnoml Complete Backup Solution|\\nNomnoml has  almost all   the needed   features\\nfor  creating   effective   diagrams   in  a  creative\\n way  (this \\\"about\\\"  for  instance shows  also  how \\nto make use of unicode special chars to improve\\nthe communication).\\n|\\nNomnoml  uses  in  a   clever  way   the  browser\\nlocalstorage, saving the drawings. Unfortunately\\nit   doesn\'t  come  natively  with a  saving/restore\\nfeature. This becomes more and more important \\nas an user saves new drawings.\\n|\\nHere comes  NCBS,  providing   an   easy  way  to \\nsave   the   whole   set   of    diagram    from   the \\nlocalstorage to a json file.\\n|\\nNomnoml saves in the browser localstorage:\\n1 - a index file with the list of the drawings\\n2 - the last drawing file, ongoing\\n3 - the drawing files themselves\\nSaid that, NCBS then  gives the chance to  decide \\nif  import    the   whole   backup  file   overwriting\\ncompletely   the  existing  data,  writing  also  the \\nindex file, or decide  to import   just the drawings\\nfiles.\\nIn that case,  if a existing  diagram  filename  has\\nbeen stored in the localstorage, the user is asked \\nto  skip   it   or   import  it  anyway,  in  such   case \\nNCBS  previous  diagram  is saved  with a  proper\\nname  in  the  localstorage   before   loading   the\\nbackup.\\n|\\nFrom  the  development  point  of  view  it  is  one \\nmonolitic  pure  javascript  that   just needs  to be \\nincluded via the <script> tag in the Nomnoml\\napplication.\\nCSS, HTML, SVG and javascript are all hardcoded,\\npossibly in a understandable way.\\nLot of console.log messages help to understand\\nwhat happens behind and offer some more info.\\n]\\n\\n\\n[🖭 NCBS|\\nNomnoml (almost) Complete Backup Solution|\\n\\n  //Definitions\\n  [🠋Download]\\n  [🠉Upload]\\n  [🖫JSON file]\\n\\n  //Details\\n   [🠉Upload|\\n      [whole|erase&substitute|also lastSource and file index\\n      are affected]\\n\\n      [detailed|⟳ foreach item i in the backup file:|\\n      //mixed\\n       [get item i| must be different \\n       than lastSource and file_index]\\n       [import item i|backup copy of the old one\\n       in the localstorage]\\n       \\n       [get item i]->[<internalcheck>does i exist in NN DB?]\\n       \\n       [<internalcheck>does i exist in NN DB?]->false[import item i]\\n       [<internalcheck>does i exist in NN DB?]->true[<question>wanna import i anyway?]\\n \\n       [<question>wanna import i anyway?]->yes[rename old item i]\\n       [rename old item i]->[import item i]\\n       \\n      [<question>wanna import i anyway?]->not[ignore item i]\\n     \\n     \\n      \\n         \\n      \\n      ]\\n      \\n   ]\\n \\n  //Relations\\n  [🠋Download]-:>[🖫JSON file]\\n  [🠉Upload]<:-[🖫JSON file]\\n\\n  \\n\\n]\\n\\n//Relations\\n[❤️Nomnoml Standard]<-Dynamically loaded)[🖭 NCBS]\\n\\n "}]';

        CUR_NMNML_BKP = JSON.parse(JSONDATA);

        importBackup();

    } else {}

}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function page_reload() {

    location.reload();
}
 
 
function credits(){


console.log("                                                                                /*************************/                                                                                                ");
console.log("                                                                      /************                   *************/                                                                                       ");
console.log("                                                                   /*******         Gabriele Motta 2020       ********/                                                                                    ");
console.log("                                                                /**                                                    **/                                                                                 ");
console.log("                                                              /**     Trincio Nomnoml Complete Backup Solution v.1.0     **/ 		                                                                      ");  			 
console.log("                                                             /*                                                            */	                                                                          ");
console.log("                                                             /*    Code style: rough and framework free, sufficient rea-   */	                                                                          ");
console.log("                                                             /*                dability, nice ideas.                       */	                                                                          ");
console.log("                                                             /*                                                            */	                                                                          ");
console.log("                                                             /*      www.gabrielemotta.com   -   www.trincio.com           */	                                                                          ");
console.log("                                                             /*                     ALL RIGHTS RESERVED                    */	                                                                          ");
console.log("                                                             /*  Freely licensed to mr. Daniel Kallin for implementing and */	                                                                          ");
console.log("                                                             /*       freely distribute his Nomnoml application            */	                                                                          ");
console.log("                                                             /*                                                            */	                                                                          ");
console.log("                                                             /*       Target: inject a simple and effective backup         */		                                                                      ");  			 
console.log("                                                              /**             system to my loved Nomnoml <3<3<3          **/                                                                               ");
console.log("                                                                /**                                                    **/                                                                                 ");
console.log("                                                                   /*******                                   ********/                                                                                    ");
console.log("                                                                      /************                   *************/                                                                                       ");
console.log("                                                                                /*************************/					                                                                              ");
 
	
console.log("               ,g ¶Å   ¸. = ¸        ___                                                                                                                              _¶¶__                 ");
console.log("       </-¡¨·¡.___*_÷_-K=¯Wczt=_¬= .`¯ ¯^¶¡       _                    ¸_                                                                                            ¯°°\°¯                 ");
console.log("    ¶¶p¯¨ZÀ:Çõ¯¯¯¯¯¯¯¯^°~møa'   ¯´·¬.;-=¯¡Ê_'·  J,£«¸,¬__ `¶(      _  .:r   _¡.                                                                               ¿__        ·¸                 ");
console.log("    ¶¶¯p>'«'  z_·.^r ,gµ¶¶¼g¡¶.  -===¬·~5._ ¯`¨''=-==««==¯¯¯```´¯¶§§¡¡¡.''''¾gª¶¶P                                                                            =Å¶¶¡        `·___     _      ");
console.log("      ¬J¡^  ___\"¯'^    `°¶Ê¯¯¡µ¸q¡        °¶¶gy,.        ¯ª¶gg»»  ¯^ÑÅ¶Þ+    ¯                                                                                    ¯^'·==\"^æ°¯¯¯¯`¶. ¶°_   ");  
console.log("       `4¿q´¢5)^             ¯J¶£¯          ¶¯Ñ¶          ¯¶ÊÑÑ¶                                                                                                _¶¶*_\"¯  ¨5 ¨<   ] |J°¯    "); 
console.log("        __Ý¶Ç¤´¯«æµgg¶¼µa.                                                                                                                                     ÑÑ^ Ñ^       »-¡>\" .¨       "); 
console.log("        ¶_¶ ÑL      ¯¯°                                                                                                                                              _¶¶¶_æ»°¯~´·^          ");
console.log("        ¶Ñ¡«¶                                                                                                                                                       ¯¯Ñ¶¶¶° .+^¶_4¶¶¹       ");
console.log("           ^m¡   ¡\"~¸¬                            '~¶¶¶¡       '~N¶¶~\"         ¡µæN~°°°~¤mg¶        ~~¶¶¶¤¤¤¤¤m¶g¿           ¡¶º°°~¤mg¶                       ÑÑ¶_0F  ¸' Ý×·¶´_¸¡^¡       ");  
console.log("              °§¡¡¨¨.<     __/                       ¶¯Ñ¶g¿       ¶L        _g¶¯          ¯¶L         w#¶       `#¶         ¶#¿      ¯Ñ                        ¨°^¯ ·«^ ¶f¶¨´^Å¶Ñ¶¶¶.       ");
console.log("       <\¯¸>  ¸'>°$`¨¨~°¶ÑÑ¶¶¶P~                     ¶   ^Ñ¶g_    ¶L        ¶#¯                       w#¶¡¡¡¡¡¡æ¶Ñ¯          °Ñ¶¶g¡_                                  (Ï L  ¸ --Î¬.         ");
console.log("       `·¸==-'¯  L0¨¡                                ¶     ¯Ñ¶¶¡  ¶L        ¶#_                       w#¶   ¯¯¯°Ñ¶§_            ¯¯°Ñ¶¶g_                  .aµ¾¶ggµµL.  >«à_¶  ¬^_ª,¹        ");
console.log("      ¶¶¶Ñ¶¶¡_ .«¸´ f¬¸ _¡¿                          ¶        ¯Ñ¶g¶L        ¯¶¶¡_           ¸         w#¶        ¶#¶       Jg        ¯#¶                     °¯¯    ,·¸¨^~ÑL_   ¯           ");
console.log("       \"$^^¯¯ .«ú  {   ¶¯Ñgg                      ,¡@¶¶«,        ¯ÑL          ¯°Ñ¶¶»¡¡¡««*º^        ,«¶¶¶»«««ææm¶Ñ¯         ¶¶m»,¡¡¡æ¶°¯                            ¶.z:+   ¯4q_           "); 
console.log("      gµ¶¯ýr.·´_ý¶¼q¿_     ¯                                                                                                                                                 ¡r°¶g          ");
console.log("         .¯. ¡-0ÊÑ¶¶Ê¯                                           www.trincio.com                                                                                   ,_        ¶ JÊÅ          ");
console.log("       /^¸X°¯-¨    ¯  ¡ _¡g                                                             www.gabrielemotta.com                                                    !¶¶¶¶¶¶¶P=¸-»¶g_´          ");
console.log("    ¡§  J   ¶, ·¡   ¸=ÅÆã¯¯                                                                                               1¶g_¶¸          *q¡q_           ¶¶       ¯      !J*~¯Î~s¿         ");
console.log("    ¡gL`¬`_··_¸«°.×´ .¸_                                            Nomnoml Complete Backup Solution              mø¡¶¡_  ¶¤Ñ¶¶¾_         ~~Ñ¶¶y_       ^¶=Nñ^__¼¡¡     . .¯``   >]|        ");
console.log("    ¯¯    ¯¯¯¯¨`       ¯¶¶g*-                                                                           ¬¶¶«Å¶L....°°°°Ñ¶*_____ =--¤*--__..  _ ¯`¿.«=----  ^<°ÑÑÑ¶¶ñ°'¬É ^¯ \" ,=´>¼Ê¶¶     "); 
console.log("               ¯·        `¯^¨             Below you can find some details about this SW                     °¯   ,¿¦¨¨``¯¯¯   ¯¯¯`.¨°^F=Þ)·-=..¸£_·¬`~· _    ¯2*4%¡¿___\"^-*__{SæÆ¯_ ¶¶     "); 
console.log("               _¡µ.¡_                                                                                             ¨                    `¯      ¨¶¡_`¨_\"·-¯¯^¨~:çEE±æ¯¯ããã¯¿¯¯5¯___ t       "); 
console.log("               ^¯¶¶¯¯                                                                                                                             ¯``¯       ´'-¯·'   ,g£¶Ñ                 ");
console.log("                  ¯                                                                                                                                                    ¯                    ");
console.log("                                                                                                                                                                                            ");	


 

} 
 
 
 
 
  