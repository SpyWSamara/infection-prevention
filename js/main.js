(function() {
    var maindata = [{
            lsd95: 1.16,
            fnoa: -0.02,
            pshf: 1.89,
            pn: -0.81,
            indifna: 0.39,
            indifny: 0.77,
            specigg: 18.85,
            correction: -410.74,
            result: 'Риск внутриутробного инфицирования низкий. Повторный курс превентивной терапии не проводится.',
        },
        {
            lsd95: 1.46,
            fnoa: -0.01,
            pshf: 1.61,
            pn: 1.17,
            indifna: 0.27,
            indifny: 0.5,
            specigg: 10.47,
            correction: -249.77,
            result: 'Риск внутриутробного инфицирования высокий. Проводится повторный курс превентивной терапии в 32-34 нед. гестации препаратом человеческого рекомбинантного интерферона альфа-2b: по 1свече (500000 МЕ), 2 раза в день каждые 12 часов, per rectum, 5 дней.',
        },
        {
            lsd95: 1.87,
            fnoa: -0.01,
            pshf: 1.4,
            pn: 1.87,
            indifna: 0.18,
            indifny: 0.35,
            specigg: 4.68,
            correction: -186.62,
            result: 'Риск реализации герпетической инфекции высокий. Проводится повторный курс превентивной терапии в 32-34 нед. гестации препаратом человеческого рекомбинантного интерферона альфа-2b: по 1свече (500000 МЕ), 2 раза в день каждые 12 часов, per rectum, 5 дней.',
        },
    ];

    var form = document.querySelector('main #mainform'),
        result = document.querySelector('main #result');

    if (form) {
        form.addEventListener('submit', function(event) {
            typeof event.preventDefault === 'function' ? event.preventDefault() : (event.returnValue = false);

            handleForm(event.currentTarget);
        });
    }

    var handleForm = function(currentForm) {
        hideResult();
        var fields = currentForm.querySelectorAll('.mdl-textfield'),
            results = Array(maindata.length).fill(0);

        fields.forEach(function(formFieldNode) {
            var values = getFieldValue(formFieldNode);
            values.forEach(function(variant, index) {
                results[index] += variant;
            });
        });
        results.forEach(function(result, index) {
            results[index] += maindata[index]['correction'];
        });
        selectResults(results);
    }
    var selectResults = function(results) {
        var maxResult = Math.max.apply(null, results),
            resultVariant = maindata[results.indexOf(maxResult)];

        // var p = Math.pow(Math.E, maxResult) / results.map(x => Math.pow(Math.E, x)).reduce((a, b) => a + b, 0);
        showResult(resultVariant.result);
    }
    var getFieldValue = function(fieldNode) {
        fieldNode.classList.remove('is-invalid');
        var input = fieldNode.querySelector('input');
        if (input && input.value) {
            var value = parseFloat(input.value),
                results = [];

            maindata.forEach(function(maindataVariant, index) {
                results[index] = value * maindataVariant[input.id];
            });

            return results;
        }
        fieldNode.classList.add('is-invalid');
        return false;
    }
    var showResult = function(resultTextString) {
        if (result && resultTextString.length > 0) {
            var resultText = result.querySelector('.mdl-card__supporting-text p');
            if (resultText) {
                resultText.innerText = resultTextString;
                result.classList.remove('hidden');
            }
        }
    }
    var hideResult = function() {
        if (result) {
            result.classList.add('hidden');
        }
    }
})();
