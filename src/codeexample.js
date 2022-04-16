export { codeExample }

const codeExample = `
//////////////////////////
//                     //
// maa première webapp
//

Intro()

Pianissimo()

Animation()

Blabla()

//////////////////////////
//                     //
// pianissomo
//
function Pianissimo() {
    Bouton('🎷 beep 🎻')
      .onClick( () => {
      beep();
    });
    
    function Toolbar(sampler) {
      let emojis = ['🍒', '🍈', '🍐', '🫐', '🥭', '🍓', '🥝', '🍒'];
      let notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
      for (let i = 0; i < emojis.length; i++) {
        Bouton(emojis[i])
          .onClick( ()=> {
            sampler.play(notes[i]);
        })
      }
    }
    
    NouvelleLigne();
    Toolbar(piano);
}
//                                  
// pianissomo
//                      \\\\
//////////////////////////



//////////////////////////
//                     //
// intro
//
function Intro() {
    Ecris("<bleu>my<blanc>super<rouge>computer<saumon>.fun")
    NouvelleLigne()
    Ecris("🎲")
    NouvelleLigne()
    Ecris("🏓 découvrir la programmation de webapp en s'amusant !")
    NouvelleLigne()
    Ecris("🏄")
    NouvelleLigne()
}
//                                  
// intro
//                      \\\\
//////////////////////////


//////////////////////////
//                     //
// animation
//
function Animation() {
    NouvelleLigne()
    Bouton("baoum !<br>💥")
        .onClick( ()=> {
            let timer = setInterval( ()=> {
            let x = Math.random() * largeurPage
            let y = Math.random() * hauteurPage
            Ecris("💥")
                .position(x,y)
            }, 100)
        
            setTimeout( ()=> {
                beep()
                clearInterval(timer)
            }, 1000)
        
            NouvelleLigne()
        
            for (let i=0; i<100; i++)
                Ecris(i)
        })
}
//                                  
// animation
//                      \\\\
//////////////////////////


//////////////////////////
//                     //
// parole
//
function Blabla() {
    NouvelleLigne()
    Bouton('🤓 Ecoute moi compter !')
    .onClick( ()=> {
        ArreteDeParler()
    
        Dit("Bonjour Elise !")
        Dit("maintenant je sais compter jusqu'à 10 !")
        Dit("Si c'est pas génial çà ?")
        Dit('Ecoute çà :')
    
        for (let i=0; i<10; i++) 
            Dit(i)
        
        Dit("Et toi, jusqu'à combien sais tu compter ?")
    })
}
//                                  
// parole
//                      \\\\
//////////////////////////

//                                  
// ma première webapp
//                      \\\\
//////////////////////////
`
