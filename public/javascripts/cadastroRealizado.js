document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    // Captura os dados do formulário
    const formData = new FormData(this);

    // Cria um objeto para enviar via fetch
    const data = {
        nome_completo: formData.get('nome_completo'),
        endereco: formData.get('endereco'),
        contato: formData.get('contato'),
        tipo_exame: formData.get('tipo_exame'),
        data_entrada: formData.get('data_entrada'),
        previsao_exame: formData.get('previsao_exame'),
    };

    try {
        // Envia os dados para o servidor usando fetch
        const response = await fetch('/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        // Exibe um alert com a mensagem do servidor
        if (result.success) {
            alert(result.message);  // Exibe mensagem de sucesso
        } else {
            alert(result.message);  // Exibe mensagem de erro
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Ocorreu um erro ao cadastrar. Tente novamente.');
    }
});