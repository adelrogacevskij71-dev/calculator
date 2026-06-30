// calculator.js - Калькулятор стоимости документооборота
(function() {
  'use strict';
  
  // Функция форматирования валюты
  function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  // Функция расчета стоимости
  function calculateCost() {
    var input = document.getElementById('contractCount');
    var output = document.getElementById('totalSum');
    
    if (!input || !output) return;
    
    // Очищаем от нечисловых символов
    var value = input.value.replace(/[^0-9]/g, '');
    
    if (value === '' || value === '0') {
      output.value = '';
      return;
    }
    
    var n = parseInt(value, 10);
    
    if (isNaN(n) || n <= 0) {
      output.value = '';
      return;
    }
    
    // Расчет тарифа
    var m;
    if (n >= 3) {
      m = 50;
    } else if (n >= 2) {
      m = 60;
    } else {
      m = 70;
    }
    
    // Итоговая стоимость
    var v = n * m * 4.75 * 1.68 * 1.15 * 1.32;
    
    // Выводим результат
    output.value = formatCurrency(v);
  }

  // Ждем загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
  } else {
    initCalculator();
  }

  function initCalculator() {
    var input = document.getElementById('contractCount');
    
    if (!input) return;
    
    // Добавляем обработчики событий
    input.addEventListener('input', calculateCost);
    input.addEventListener('change', calculateCost);
    
    // Если есть начальное значение - рассчитываем
    if (input.value) {
      calculateCost();
    }
    
    console.log('Калькулятор документооборота инициализирован');
  }
})();
