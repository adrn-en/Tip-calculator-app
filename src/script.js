const buttons = document.querySelectorAll('.btn'),
	resetBtn = document.getElementById('reset-btn'),
	bill = document.getElementById('bill-input'),
	people = document.getElementById('people-count'),
	customTip = document.getElementById('custom-input'),
	tipAmount = document.getElementById('tip-amount'),
	totalAmount = document.getElementById('total-amount'),
	inputs = document.querySelectorAll('.inp'),
	errorText = document.getElementById('error-popup')

const numOnly = (e) => {
	var charCode = e.which ? e.which : e.keyCode
	if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		e.preventDefault()
	}
}

let tip = 0

const summary = (selectedTip) => {
	const bills = parseFloat(bill.value) || 0
	const num_Of_People = parseInt(people.value) || 0
	const tip_Percent = selectedTip / 100

	if (bill.value >= 0 && people.value > 0 && tip_Percent >= 0) {
		resetBtn.classList.remove('disabled')
		const tip_Amount = (bills * tip_Percent) / num_Of_People
		const total_Amount = (bills + bills * tip_Percent) / num_Of_People

		tipAmount.innerText = `$${tip_Amount.toFixed(2)}`
		totalAmount.innerText = `$${total_Amount.toFixed(2)}`
	} else {
		return
	}
}

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		const currentValue = button.value
		buttons.forEach((btn) => {
			const newValue = btn.value
			if (newValue != currentValue) {
				btn.classList.remove('btn-focus')
			} else {
				btn.classList.add('btn-focus')
				customTip.value = ''
				tip = newValue
				zeroPeople()
				summary(tip)
			}
		})
	})
})

inputs.forEach((input) => {
	input.addEventListener('input', () => {
		summary(tip)
	})
})

customTip.addEventListener('focus', () => {
	buttons.forEach((button) => {
		button.classList.remove('btn-focus')
	})

	tip = 0

	customTip.addEventListener('input', () => {
		zeroPeople()
		summary(customTip.value)
	})
})
people.addEventListener('focus', () => {
	errorText.style.visibility = 'hidden'
	people.classList.remove('err-line')
})
const zeroPeople = () => {
	if (people.value.trim() === 0 || people.value == '') {
		errorText.style.visibility = 'visible'
		people.classList.add('err-line')
	} else {
		errorText.style.visibility = 'hidden'
		people.classList.remove('err-line')
	}
}
resetBtn.addEventListener('click', () => {
	tip = 0
	customTip.value = ''
	bill.value = ''
	people.value = ''
	tipAmount.innerText = '$0.00'
	totalAmount.innerText = '$0.00'
	buttons.forEach((button) => {
		button.classList.remove('btn-focus')
	})
	resetBtn.classList.add('disabled')
})
