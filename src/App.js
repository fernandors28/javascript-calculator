/*import logo from './logo.svg';*/
import react from 'react';
import './App.css';
const red = {backgroundColor: 'rgb(172, 57, 57)', Color:'black'}, 
azul= {backgroundColor: 'rgb(59, 119, 187)' }
const b= /[x/+-]/;
const operators=/[x+-/]$/ ;
const negativeSign=/[0-9][x/+-]{1}-$/;



class App extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      current:'0',
      prev:'0',
      formula: ''
     
    }
    // //
   
    this.alertWarningLimit = this.alertWarningLimit.bind(this);  
    this.handleNumber =  this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.rebootCalculator =  this.rebootCalculator.bind(this);
    this.handleresult = this.handleresult.bind(this);
    this.handledecimal= this.handledecimal.bind(this);
    // //
  }
  
  handleresult() {
    if (!this.state.current.includes('Limit')) {
      let expression = this.state.formula;
      while (operators.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/-/g, '-')
        .replace('--', '+0+0+0+0+0+0+');
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        current: answer.toString(),
        formula:
          expression
            .replace(/\*/g, '⋅')
            .replace(/-/g, '-')
            .replace('+0+0+0+0+0+0+', '--')
            .replace(/(x|\/|\+)-/, '$1-')
            .replace(/^-/, '-') +
          '=' +
          answer,
        prev: answer,
        evaluate: true
      });
    }
  }

  handleOperator(e) {
    if (!this.state.current.includes('Limit')) {
      const valor = e.target.value;
      const { formula, prev, evaluate} = this.state;
      this.setState({ current: valor, evaluate: false });
      if (evaluate) {
        this.setState({ formula: prev + valor });
      } else if (!operators.test(formula)) {
        this.setState({
          prev: formula,
          formula: formula + valor
        });
      } else if (!negativeSign.test(formula)) {
        this.setState({
          formula:
            (negativeSign.test(formula + valor) ? formula : prev) + valor
        });
      } else if (valor !== '-') {
        this.setState({
          formula: prev + valor
        });
      }
    }
  }

  handleNumber(e) {
    if (!this.state.current.includes('Limit')) {
      const { current, formula, evaluate } = this.state;
      const valor = e.target.value;
      this.setState({ evaluate: false });
      if (current.length > 21) {
        this.maxDigitWarning();
      } else if (evaluate) {
        this.setState({
          current: valor,
          formula: valor !== '0' ? valor : ''
        });
      } else {
        this.setState({
          current:
            current === '0' || b.test(current)
              ? valor
              : current + valor,
          formula:
            current === '0' && valor === '0'
              ? formula === ''
                ? valor
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
                ? formula.slice(0, -1) + valor
                : formula + valor
        });
      }
    }
  }

  handledecimal() {
    if (this.state.evaluate === true) {
      this.setState({
        current: '0.',
        formula: '0.',
        evaluate: false
      });
    } else if (
      !this.state.current.includes('.') &&
      !this.state.current.includes('Limit')
    ) {
      this.setState({ evaluate: false });
      if (this.state.current.length > 21) {
        this.maxDigitWarning();
      } else if (
        operators.test(this.state.formula) ||
        (this.state.current === '0' && this.state.formula === '')
      ) {
        this.setState({
          current: '0.',
          formula: this.state.formula + '0.'
        });
      } else {
        this.setState({
          current: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.'
        });
      }
    }
  }
  
  
  rebootCalculator(){
    this.setState({
      current:'0',
      prev:'0',
      formula: '',
      evaluate: false
    })
  }
  alertWarningLimit(){
    this.setState({
      current: 'Digit Limit Met',
      prev: this.state.current
    });
    setTimeout(() => 
      this.setState({
        current: this.state.prev
      }), 1000
    );
  }
  

  render(){
    console.log(this.state.evaluate === true)
    return (
    <div className="App">
      <header className="App-header">
        <div className="contenedor">
          <Formula 
            formula={this.state.formula.replace(/x/g, '·')}
          />
          <Display 
            current={this.state.current}
          />
          <Botones
            decimal={this.handledecimal}
            number={this.handleNumber}
            operator={this.handleOperator}
            incializa={this.rebootCalculator}
            result={this.handleresult}
          />
        </div>    
      </header>
    </div>
    );
  }
}
class Botones extends react.Component{
  render(){
    return(
      <div id="botones-calculadora">
      <button 
        id="clear"
        className="jumbo"
        onClick={this.props.incializa}
        
        style={red}
      >AC</button>
      <button 
        id="divide"
        onClick={this.props.operator}
        value="/"
      >/</button>
      <button 
        id="multiply"
        onClick={this.props.operator} 
        value="x"
      >X</button>
      <button 
        id="seven"
        onClick={this.props.number}
        value="7"
      >7</button>
      <button 
        id="eight"
        onClick={this.props.number}
        value ="8"
      >8</button>
      <button 
        id="nine"
        onClick={this.props.number}
        value="9"
      >9</button>
      <button 
        id="subtract"
        onClick={this.props.operator} 
        value="-"
      >-</button>
      <button 
        id="four"
        onClick={this.props.number}
        value="4"
      >4</button>
      <button 
        id="five"
        onClick={this.props.number}
        value="5"
      >5</button>
      <button 
        id="six"
        onClick={this.props.number}
        value="6"
      >6</button>
      <button 
        id="add"
        onClick={this.props.operator} 
        value="+"
      >+</button>
      <button 
        id="one"
        onClick={this.props.number}
        value="1"
      >1</button>
      <button 
        id="two"
        onClick={this.props.number}
        value="2"
      >2</button>
      <button 
        id="three"
        onClick={this.props.number}
        value="3"
      >3</button>
      <button 
        id="zero" 
        onClick={this.props.number}
        className="jumbo"
        value="0"
        
      >0</button>
      <button 
        id="decimal"
        onClick={this.props.decimal}
        value='.'
      >.</button>
      <button 
        id="equals"
        onClick={this.props.result}
        style={azul}
        value='='
      >=</button>
    </div>
    )
  }
}
class Formula extends react.Component{
  constructor(props){
    super(props);
  }
  render(){

    
    return(
      <div id="formula"> 
        <div className="formu">
          {this.props.formula}
        </div>
      </div>
    )
  }
}
class Display extends react.Component{
  constructor(props){
    super(props)
  }
  render(){
    
    return(
      <div id="display">
        <div className="number">
          {this.props.current}
        </div>
      </div>
    )
  }
}
export default App;
