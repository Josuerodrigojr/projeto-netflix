export function getPaginationParams(query: any):[page:number,perPage:number]{
     //Configurando a página de conteúdos, page será a quantidade de páginas, perPage a quantidade de elementos por página.
		const { page, perPage } = query

        const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
          ? parseInt(perPage, 10)
          : 10
    
        const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
          ? parseInt(page, 10)
          : 1
    
          return [pageNumber, perPageNumber]
}