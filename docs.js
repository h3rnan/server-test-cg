const MethodPaymentEnum = {
  cash: "cash",
  credit: "credit",
  other: "other",
};

const MethodPaymentCreditEnum = {
  currentAccount: 14,
  check: 15,
};

const MethodPaymentCashEnum = {
  webpay: 17,
  bank: 18,
};

const MethodPaymentOtherEnum = {
  manual: 16,
};

const docs = {
  products: [
    {
      id: 0,
      name: "Cilindro 5kg",
      type: "normal",
      enabled: true,
      weight: 5,
      price: 10485,
      isPallet: true,
    },
    {
      id: 1,
      name: "Cilindro 11kg",
      type: "normal",
      enabled: true,
      weight: 11,
      price: 15255,
      isPallet: true,
    },
    {
      id: 2,
      name: "Cilindro 15kg",
      type: "normal",
      enabled: true,
      weight: 15,
      price: 21700,
      isPallet: true,
    },
    {
      id: 3,
      name: "Cilindro 45kg",
      type: "normal",
      enabled: true,
      weight: 45,
      price: 60000,
      isPallet: true,
    },
    {
      id: 4,
      name: "G.H 15kg",
      description: "normal acero",
      type: "gh",
      enabled: true,
      weight: 15,
      price: 35,
    },
    {
      id: 5,
      name: "G.H 15kg",
      description: "normal aluminio",
      type: "gh",
      enabled: true,
      weight: 15,
      price: 38,
    },
  ],
  combinations: [
    {
      id: 0,
      idProducts: [0, 1],
      combinations: [
        [
          {
            id: 0,
            name: "Cilindro 5kg",
            type: "normal",
            enabled: true,
            weight: 5,
            price: 10485,
            isPallet: true,
            amount: 10,
          },
          {
            id: 1,
            name: "Cilindro 11kg",
            type: "normal",
            enabled: true,
            weight: 11,
            price: 15255,
            isPallet: true,
            amount: 5,
          },
        ],
        [
          {
            id: 0,
            name: "Cilindro 15kg",
            type: "normal",
            enabled: true,
            weight: 15,
            price: 10485,
            isPallet: true,
            amount: 15,
          },
          {
            id: 1,
            name: "Cilindro 45kg",
            type: "normal",
            enabled: true,
            weight: 45,
            price: 15255,
            isPallet: true,
            amount: 10,
          },
        ],
      ],
    },
    {
      id: 1,
      idProducts: [0, 1, 2, 3],
      combinations: [
        [
          {
            id: 0,
            name: "Cilindro 5kg",
            type: "normal",
            enabled: true,
            weight: 5,
            price: 10485,
            isPallet: true,
            amount: 10,
          },
          {
            id: 1,
            name: "Cilindro 11kg",
            type: "normal",
            enabled: true,
            weight: 11,
            price: 15255,
            isPallet: true,
            amount: 5,
          },
          {
            id: 2,
            name: "Cilindro 15kg",
            type: "normal",
            enabled: true,
            weight: 15,
            price: 15255,
            isPallet: true,
            amount: 5,
          },
          {
            id: 3,
            name: "Cilindro 45kg",
            type: "normal",
            enabled: true,
            weight: 45,
            price: 15255,
            isPallet: true,
            amount: 15,
          },
        ],
        [
          {
            id: 0,
            name: "Cilindro 5kg",
            type: "normal",
            enabled: true,
            weight: 5,
            price: 10485,
            isPallet: true,
            amount: 15,
          },
          {
            id: 1,
            name: "Cilindro 11kg",
            type: "normal",
            enabled: true,
            weight: 11,
            price: 15255,
            isPallet: true,
            amount: 10,
          },
          {
            id: 2,
            name: "Cilindro 15kg",
            type: "normal",
            enabled: true,
            weight: 15,
            price: 15255,
            isPallet: true,
            amount: 5,
          },
          {
            id: 3,
            name: "Cilindro 45kg",
            type: "normal",
            enabled: true,
            weight: 45,
            price: 15255,
            isPallet: true,
            amount: 15,
          },
        ],
      ],
    },
  ],
  positiveBalance: [
    {
      id: 1,
      numDocument: 1000000000,
      dateCreation: "28/08/2023",
      value: 10000,
      type: "rut",
    },
    {
      id: 2,
      numDocument: 1000000001,
      dateCreation: "28/08/2023",
      value: 10001,
      type: "discount",
    },
    {
      id: 3,
      numDocument: 1000000002,
      dateCreation: "28/08/2023",
      value: 10001,
      type: "oneClick",
    },
    {
      id: 4,
      numDocument: 1000000003,
      dateCreation: "28/08/2023",
      value: 10001,
      type: "others",
    },
    {
      id: 5,
      numDocument: 1000000004,
      dateCreation: "28/09/2023",
      value: 1000000,
      type: "oneClick",
    },
    {
      id: 6,
      numDocument: 1000000005,
      dateCreation: "28/09/2023",
      value: 400000,
      type: "discount",
    },
  ],
  paymentMethods: [
    {
      id: 1,
      name: "Cuenta corriente a 3 días",
      value: 3,
      method: MethodPaymentCreditEnum.currentAccount,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 2,
      name: "Cuenta corriente a 7 días",
      ref: "",
      value: 7,
      method: MethodPaymentCreditEnum.currentAccount,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 3,
      name: "Cuenta corriente a 10 días",
      value: 10,
      method: MethodPaymentCreditEnum.currentAccount,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 4,
      name: "Cuenta corriente a 1 día",
      value: 1,
      method: MethodPaymentCreditEnum.currentAccount,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 5,
      name: "Cuenta corriente a 2 días",
      value: 2,
      method: MethodPaymentCreditEnum.currentAccount,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 6,
      name: "Cuenta corriente a 15 días",
      value: 15,
      method: MethodPaymentCreditEnum.currentAccount,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 7,
      name: "Cheque al día",
      value: 1,
      method: MethodPaymentCreditEnum.check,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 8,
      name: "Cheque a 3 días",
      value: 3,
      method: MethodPaymentCreditEnum.check,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 9,
      name: "Cheque a 10 días",
      value: 10,
      method: MethodPaymentCreditEnum.check,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 10,
      name: "Cheque a 15 díaa",
      value: 15,
      method: MethodPaymentCreditEnum.check,
      type: MethodPaymentEnum.credit,
    },
    {
      id: 11,
      name: "Santander",
      value: "Santander",
      method: MethodPaymentCashEnum.bank,
      type: MethodPaymentEnum.cash,
    },
    {
      id: 12,
      name: "Banco de Chile",
      value: "Banco de Chile",
      method: MethodPaymentCashEnum.bank,
      type: MethodPaymentEnum.cash,
    },
    {
      id: 13,
      name: "Banco Estado",
      value: "Banco Estado",
      method: MethodPaymentCashEnum.bank,
      type: MethodPaymentEnum.cash,
    },
    {
      id: MethodPaymentCashEnum.webpay,
      name: "WebPay",
      value: "WebPay",
      type: MethodPaymentEnum.cash,
      method: MethodPaymentCashEnum.webpay,
    },
    {
      id: MethodPaymentOtherEnum.manual,
      name: "Transferencia manual",
      value: "Transferencia manual",
      type: MethodPaymentEnum.other,
      method: MethodPaymentOtherEnum.manual,
    },
  ],
};

module.exports = docs;
