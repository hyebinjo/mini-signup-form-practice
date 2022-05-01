// TODO: 이 곳에 정답 코드를 작성해주세요.
const html = document.querySelector('html')
const id = document.querySelector('#id')
const pw = document.querySelector('#pw')
const pwCheck = document.querySelector('#pw-check')
const idMsg = document.querySelector('#id-msg')
const pwMsg = document.querySelector('#pw-msg')
const pwCheckMsg = document.querySelector('#pw-check-msg')
const form = document.querySelector('#form')
const modal = document.querySelector('#modal')
const plusBtn = document.querySelector('#increase-font-btn')
const minusBtn = document.querySelector('#decrease-font-btn')

function checkId() {
    const validId = /^([a-z]|[0-9]|_|-){5,20}$/g
    return validId.test(id.value)
}

function checkPassword() {
    const validPw = /^([a-z]|[0-9]){8,16}$/gi
    return validPw.test(pw.value)
}

function confirmPassword() {
    return pw.value === pwCheck.value
}

function validate(input, checkFunc, messageDom, message) {
    if (!input.value) {
        input.classList.add('border-red-600')
        messageDom.textContent = '필수 정보입니다.'
    } else if (!checkFunc()) {
        input.classList.add('border-red-600')
        messageDom.textContent = message
    } else {
        input.classList.remove('border-red-600')
        messageDom.textContent = ''
    }
}

id.focus()

id.addEventListener('blur', (e) => {
    validate(
        e.target,
        checkId,
        idMsg,
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
    )
})

pw.addEventListener('blur', (e) => {
    validate(
        e.target,
        checkPassword,
        pwMsg,
        '8~16자 영문 대 소문자, 숫자를 사용하세요.'
    )
})

pwCheck.addEventListener('blur', (e) => {
    validate(
        e.target,
        confirmPassword,
        pwCheckMsg,
        '비밀번호가 일치하지 않습니다.'
    )
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (checkId() && checkPassword() && confirmPassword()) {
        document.querySelector('#confirm-id').textContent = id.value
        document.querySelector('#confirm-pw').textContent = pw.value
        modal.setAttribute('open', '')
    }
})

modal.addEventListener('click', (e) => {
    if (e.target.id === 'approve-btn') {
        alert('가입되었습니다 🥳 ')
        modal.removeAttribute('open')
    } else if (e.target.id === 'cancel-btn') modal.removeAttribute('open')
})

plusBtn.addEventListener('click', () => {
    minusBtn.removeAttribute('disabled')
    !html.style.fontSize &&
        (html.style.fontSize = window.getComputedStyle(html).fontSize)
    const fontSizeNum = Number(html.style.fontSize.replace('px', ''))
    html.style.fontSize = `${fontSizeNum + 1}px`
    fontSizeNum == 19 && plusBtn.setAttribute('disabled', '')
})

minusBtn.addEventListener('click', () => {
    plusBtn.removeAttribute('disabled')
    !html.style.fontSize &&
        (html.style.fontSize = window.getComputedStyle(html).fontSize)
    const fontSizeNum = Number(html.style.fontSize.replace('px', ''))
    html.style.fontSize = `${fontSizeNum - 1}px`
    fontSizeNum == 13 && minusBtn.setAttribute('disabled', '')
})
