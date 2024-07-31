import React from 'react'

export default function About() {
  return (
    <div className='max-w-[850px] mx-auto p-10 flex flex-col gap-10'>
      <h1 className='text-3xl text-center mt-10'>Sobre a RealEstateHub</h1>
      <p className='text-slate-700'>
        Fundada em 2024, nossa plataforma nasceu da paixão por conectar pessoas aos seus espaços perfeitos. Com uma equipe de especialistas em mercado imobiliário e tecnologia, oferecemos uma experiência intuitiva e personalizada para cada usuário.
      </p>
      <div>
        <h2 className='text-xl text-slate-950'>Nossa missão</h2>
        <p className='text-slate-700'>
          Acreditamos que encontrar o imóvel certo deve ser uma experiência simples e prazerosa. Por isso, nos dedicamos a fornecer um serviço de alta qualidade, com informações detalhadas, fotos reais e suporte contínuo durante todo o processo. Queremos ser mais do que apenas um site de anúncios, queremos ser seu parceiro na realização dos seus sonhos.
        </p>
      </div>
      <div>
        <h2 className='text-xl text-slate-950'>O que oferecemos</h2>
        <ul className='text-slate-700'>
          <li><span className='font-semibold text-slate-950'>Variedade de Imóveis:</span> De apartamentos e casas a espaços comerciais e terrenos, temos uma vasta gama de opções para atender todas as necessidades e preferências.</li>
          <li><span className='font-semibold text-slate-950'>Busca Personalizada:</span> Utilize nossos filtros avançados para encontrar exatamente o que você procura, com base em localização, preço, tamanho, e muito mais.</li>
          <li><span className='font-semibold text-slate-950'>Anúncios Detalhados:</span> Cada imóvel possui descrições completas, fotos de alta qualidade e informações essenciais para ajudá-lo a tomar a melhor decisão.</li>
          <li><span className='font-semibold text-slate-950'>Suporte ao Cliente:</span> Nossa equipe está sempre pronta para ajudar, oferecendo suporte através de chat, e-mail e telefone.</li>
          <li><span className='font-semibold text-slate-950'>Segurança e Confiança:</span> Garantimos que todos os nossos anúncios são verificados e que as transações sejam seguras, proporcionando tranquilidade para compradores, vendedores e locatários.</li>
        </ul>
      </div>
      <div>
        <h2 className='text-xl text-slate-950'>Nossa visão</h2>
        <p className='text-slate-700'>Queremos transformar o mercado imobiliário, tornando-o mais acessível e transparente para todos. Buscamos inovar continuamente, incorporando as últimas tecnologias e tendências do setor para oferecer a melhor experiência possível.</p>
      </div>
      <div className='border border-slate-700' />
      <div>
        <p className='text-slate-700'>Venha descobrir o imóvel dos seus sonhos conosco. Na RealEstateHub, sua próxima grande conquista está a apenas um clique de distância!</p>
      </div>
    </div>
  )
}
