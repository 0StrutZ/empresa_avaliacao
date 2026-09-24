document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formFilme');
  const tituloInput = document.getElementById('titulo');
  const sinopseInput = document.getElementById('sinopse');
  const anoInput = document.getElementById('ano');
  const mensagem = document.getElementById('mensagem');
  const listaFilmes = document.getElementById('listaFilmes');
  const contador = document.getElementById('contador');

  const filmes = [];

  // Evento input: mostra uma prévia do título digitado.
  tituloInput.addEventListener('input', () => {
    const titulo = tituloInput.value.trim().toUpperCase();

    if (titulo) {
      mensagem.textContent = `Título: ${titulo}`;
      mensagem.className = 'mt-4 min-h-6 text-sm font-medium text-blue-600';
    } else {
      mensagem.textContent = '';
    }
  });

  form.addEventListener('submit', (event) => {
    // Impede o recarregamento da página.
    event.preventDefault();

    const titulo = tituloInput.value.trim().toUpperCase();
    const sinopse = sinopseInput.value.trim();
    const ano = Number(anoInput.value);

    if (!titulo || !sinopse || !ano) {
      mensagem.textContent = 'Preencha todos os campos.';
      mensagem.className = 'mt-4 min-h-6 text-sm font-medium text-red-600';
      return;
    }

    // filter() é usado para verificar se já existe um filme com o mesmo título.
    const filmeExistente = filmes.filter((filme) => filme.titulo === titulo);

    if (filmeExistente.length > 0) {
      mensagem.textContent = 'Este filme já foi cadastrado.';
      mensagem.className = 'mt-4 min-h-6 text-sm font-medium text-red-600';
      return;
    }

    // push() adiciona o novo filme ao array.
    filmes.push({
      titulo,
      sinopse,
      ano
    });

    form.reset();
    mensagem.textContent = 'Filme cadastrado com sucesso!';
    mensagem.className = 'mt-4 min-h-6 text-sm font-medium text-green-600';

    mostraFilmes();
  });

  function mostraFilmes() {
    listaFilmes.innerHTML = '';

    // Cria uma cópia ordenada pelo ano, do mais recente para o mais antigo.
    const filmesOrdenados = [...filmes].sort((a, b) => b.ano - a.ano);

    contador.textContent = `${filmesOrdenados.length} filme${filmesOrdenados.length === 1 ? '' : 's'}`;

    if (filmesOrdenados.length === 0) {
      listaFilmes.innerHTML = `
        <p class="col-span-full text-gray-500 bg-white rounded-lg p-6 text-center">
          Nenhum filme cadastrado ainda.
        </p>
      `;
      return;
    }

    filmesOrdenados.forEach((filme) => {
      const card = document.createElement('article');
      card.className = 'bg-white rounded-xl shadow p-5 border border-gray-200';

      const titulo = document.createElement('h3');
      titulo.className = 'text-xl font-bold text-blue-700 mb-2';
      titulo.textContent = filme.titulo;

      const ano = document.createElement('p');
      ano.className = 'text-sm font-semibold text-gray-500 mb-3';
      ano.textContent = `Lançamento: ${filme.ano}`;

      const sinopse = document.createElement('p');
      sinopse.className = 'text-gray-700 leading-relaxed';
      sinopse.textContent = filme.sinopse;

      card.appendChild(titulo);
      card.appendChild(ano);
      card.appendChild(sinopse);
      listaFilmes.appendChild(card);
    });
  }

  mostraFilmes();
});
