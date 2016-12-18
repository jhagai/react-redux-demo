var CARD_TYPE_ENUM = {
    amex: {
        regex: /^(34|37).*$/
        , label: 'American express'
        , maxLength : 15
        , securityCodeLength: 5
    }
    , visa : {
        regex: /^(4[1-5]).*$/
        , label: 'VISA'
        , maxLength : 16
        , securityCodeLength: 3
    }
    , mastercard : {
        regex: /^(5[1-5]).*$/
        , label: 'Mastercard'
        , maxLength : 16
        , securityCodeLength: 3
    }

}

export default CARD_TYPE_ENUM