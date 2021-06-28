View.createElement('div', {
    "class": "login",
  },
  [
    View.createElement('h3', {
        "v-bind:style": "middleStyle",
      },
      [
        View.createText('{{stateTitle.value}}'),
      ]),
    View.createElement('button', {
        "@click": "$parent.addNumbers",
        "class": "btn btn-6 btn-success goLogin",
      },
      [
        View.createText('加'),
      ]),
    View.createElement('button', {
        "@click": "$parent.decreaseNumbers",
        "class": "btn btn-6 btn-default",
      },
      [
        View.createText('减'),
      ]),
    View.createElement('slot',
      null,
      []),
    View.createElement('div', {
        "key": "123",
        "v-if": "showForm.value",
        "id": "login",
        "style": "height: 4rem",
      },
      [
        View.createElement('VForm', {
            "v-bind:formItem": "formItems",
            "ref": "vForm",
          },
          []),
      ]),
    View.createElement('div', {
        "class": ".btn-wrap",
      },
      [
        View.createElement('button', {
            "@click": "handleLogin",
            "class": "btn btn-12 btn-success goLogin",
          },
          [
            View.createText('登录'),
          ]),
        View.createElement('slot', {
            "name": "middle",
          },
          []),
        View.createElement('button', {
            "@click": "changeTitle",
            "class": "btn btn-12 btn-default goRegist",
          },
          [
            View.createText('注册'),
          ]),
        View.createElement('slot', {
            "name": "foot",
          },
          [
            View.createElement('p',
              null,
              [
                View.createText('I am reserve foot slot;'),
              ]),
          ]),
        View.createElement('button', {
            "@click": "toggleForm",
            "class": "btn btn-12 btn-default goRegist",
          },
          [
            View.createText('{{showForm.value ? \'隐藏表格\' : \'显示表格\'}}'),
          ]),
      ]),
  ])