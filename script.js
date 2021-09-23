function getHistory() {
	return document.getElementById('history-value').innerText
}

function getOutput() {
	return document.getElementById('output-value').innerText
}

const printHistory = (num) => {
	document.getElementById('history-value').innerText = num
}

const printOutput = (num) => {
	if (num == '') {
		document.getElementById('output-value').innerText = num
	} else {
		document.getElementById('output-value').innerText = getFormatNumber(num)
	}
}

function getFormatNumber(num) {
	if (num == '-') {
		return ''
	}
	var n = Number(num)
	var value = n.toLocaleString('en')
	return value
}

function reverseNumberFormat(num) {
	return Number(num.replace(/,/g, ''))
}

const operator = document.querySelectorAll('.operator')
for (let i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click', function () {
		if (this.id == 'clear') {
			printOutput('')
			printHistory('')
		}
		if (this.id == 'backspace') {
			var output = reverseNumberFormat(getOutput()).toString()
			if (output) {
				output = output.substr(0, output.length - 1)
				printOutput(output)
			}
		} else {
			var output = getOutput()
			var history = getHistory()
			if (output == '' && history != '') {
				if (isNaN(history[history.length - 1])) {
					history = history.substr(0, history.length - 1)
				}
			}
			if (output != '' || history != '') {
				output = output == '' ? output : reverseNumberFormat(output)
				history = history + output
				if (this.id == '=') {
					var result = eval(history)
					printOutput(result)
					printHistory('')
				} else {
					history = history + this.id
					printHistory(history)
					printOutput('')
				}
			}
		}
	})
}

const number = document.getElementsByClassName('number')
for (let i = 0; i < number.length; i++) {
	number[i].addEventListener('click', function () {
		let output = reverseNumberFormat(getOutput())
		if (output != NaN) {
			output = output + this.id
			printOutput(output)
		}
	})
}
