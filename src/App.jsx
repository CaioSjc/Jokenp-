import React from 'react'
import PEDRA from './assets/PEDRA.svg'
import TESOURA from './assets/TESOURA.svg'
import PAPEL from './assets/PAPEL.svg'
import computer from './assets/computer.svg'
import mouse from './assets/mouse.svg'
import trofeu from './assets/trofeu.svg'

const OPTIONS = {
  PEDRA:<img className='boxPedra1' src={PEDRA}/>,
  TESOURA:<img className='boxTesoura1' src={TESOURA}/>,
  PAPEL:<img className='boxPapel1' src={PAPEL}/>
}

const SCREEN = {
  START: 'tela-selecao',
  PROGRESS: 'tesoura',
  END: 'papel'
}

const DEFAULT_INIT = {
  title: 'Escolha uma opção a baixo!!!',
  title2: 'Você',
  title3: 'VS',
  title4: 'Computador',
  screen: SCREEN.START,
  player1: null,
  player2: null
}

class App extends React.Component {
  state = DEFAULT_INIT

  randomOption () {
    const option = Math.floor(Math.random() * 3)

    switch (option) {
      case 0: return OPTIONS.PEDRA
      case 1: return OPTIONS.TESOURA
      default: return OPTIONS.PAPEL
    }
  }

  winner (player1, player2) {
    if (player1 === player2) {
      return 'empate'
    }

    if (
      (player1 === OPTIONS.PEDRA && player2 === OPTIONS.TESOURA) ||
      (player1 === OPTIONS.TESOURA && player2 === OPTIONS.PAPEL) ||
      (player1 === OPTIONS.PAPEL && player2 === OPTIONS.PEDRA)
    ) {
      return 'player1'
    }

    return 'player2'

  }

  selectOption (option) {
    if (this.state.player1) return;
    const player1 = option
    const player2 = this.randomOption()
    const winner = this.winner(player1, player2)

    let title = <div><img className='trofeu' src={trofeu}/>Você venceu! Parabéns!</div>

    if (winner === 'empate') {
      title = 'O jogo empatou!'
    } else if (winner === 'player2') {
      title = <div>O computador venceu! Que pena!<img className='iconComputer' src={computer}/><img className='iconMouse' src={mouse}/></div>
    }

    this.setState({
      player1,
      player2,
      title,
      screen: SCREEN.PROGRESS
    })
  }

  gameStart () {
    this.setState(DEFAULT_INIT)
  }

  gameOver () {
    this.setState({
      player1: null,
      player2: null,
      screen: SCREEN.END,
      title: <div className='body2' >
              Obrigado por jogar!!!
              <br/>
              Volte sempre!!!
             </div>
    })
  }

  render () {
    
    if (this.state.screen === SCREEN.END) {
      return (
        <div>         
          <h2>{this.state.title}</h2>
        </div>
      )
    }

    return (
      <div className="jokenpo">
       <div className='ladoUsuario'>
        <div className='styleLado'>
        <h1 className='voce' >{this.state.title2}</h1>
        <h1 className='versus' >{this.state.title3}</h1>
        <h1 className='comput' >{this.state.title4}</h1>
        </div>
        <h2>{this.state.title}</h2>

        <div className="rowPlayer">
          <div className="box player1">{this.state.player1}</div>
          <div className="box player2">{this.state.player2}</div>
        </div>

        <div className="rowOptions">
          <div
            className="box pedra"
            onClick={() => this.selectOption(OPTIONS.PEDRA)}          
          >
          <img className='boxPedra' src={PEDRA}/>
          <h4>PEDRA</h4>
          </div>
          
          <div
            className="box tesoura"
            onClick={() => this.selectOption(OPTIONS.TESOURA)}
          >
          <img className='boxTesoura' src={TESOURA}/>
          <h4>TESOURA</h4>
          </div>

          <div
            className="box papel"
            onClick={() => this.selectOption(OPTIONS.PAPEL)}
          >
          <img className='boxPapel' src={PAPEL}/>
          <h4>PAPEL</h4>
          </div>
        </div>

        {this.state.screen === SCREEN.PROGRESS && (
          <div>
            <h2 className='titleContent'>Jogar novamente?</h2>
            <div className="row">
              <button className='button1' onClick={this.gameStart.bind(this)}>SIM</button>
              <button className='button1' onClick={this.gameOver.bind(this)}>NÃO</button>
            </div>
          </div>
        )}
      </div>
      </div>
    )
  }
  
}

export default App