// postcss.config.js

// ���������� ������� � ����
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // ���������� ������� � PostCSS
  plugins: [
    // ���������� autoprefixer
    autoprefixer,
    // cssnano ��� ����������� ����� �������� ������ �����
    // { preset: default } ������� � ���, ��� ����� ������������
    // ����������� ��������� �����������
    cssnano({ preset: 'default' })
  ]
};