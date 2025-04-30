const presets = [
  ['@babel/preset-env', { // ����� ������ ������������
    targets: { // ����� ������ ��������� ������������
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // ������������ �������� ��� ��������� �� �������� target
    // �� ��������� babel ���������� �������� ���������� core-js
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };