const el = React.createElement;


const SubmitForm = ({function1, inputValue, function2}) => {
  return  el('div', {className: 'input_container', key: 'div_input_container'}, [
        el('input', {id: 'input', key: 'password_input', placeholder: 'insert password', onChange: function1, value: inputValue}),
        el('button', {id: 'button', key: 'password_submit_button', onClick: function2}, 'Check')
    ])
}


const Table = ({answer}) => {
    const textTable = ['velika slova', 'mala slova', 'brojevi', 'specijalni karakteri'];
   return el('div', {className: 'table_wrapper', key: 'div_table_wrapper'}, [
        el('table', {id: 'table', key: 'sum_table'}, [
            el('tbody', {key: 'table_body'}, [
                el('tr', {key: 'tr_table_first'}, textTable.map(item => {
                    return el('th', {key: textTable.indexOf(item)}, item)
                })),
                el('tr', {key: 'tr_table_second'}, answer? Object.keys(answer).map((item, i) => {
                    return el('td', {key: i}, answer[item])
                }) :  [
                    el('td', {key: '1'}, 0),
                    el('td', {key: '2'}, 0),
                    el('td', {key: '3'}, 0),
                    el('td', {key: '4'}, 0),
                ]
                
            ),
            ])
        ])
    ])
}

function PasswordCheckerContent() {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [sums, setSums] = React.useState();

    const getPassword = (e) => setPasswordValue(e.target.value);

    const handleClickFetch = async () => {
        const dataToSend = {
            password: passwordValue
        }
        const checkPassword = await fetch('http://localhost:3000/passwordChecker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });
        const content = await checkPassword.json();
        setSums(content);
      }
    

        return  el('div', {className: 'container', key: 'div_container'}, [
            el(SubmitForm, {key: 'submitform', function1: getPassword, function2: handleClickFetch}),
            el(Table, {key: 'table', answer: sums})
        ])
        
    }
        



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(el(PasswordCheckerContent));