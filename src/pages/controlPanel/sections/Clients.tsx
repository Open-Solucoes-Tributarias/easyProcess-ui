'use client'

import { useEffect, useState } from 'react'
import { Grid, GridItem, List, ListItem, Text } from '@chakra-ui/react'
import { SearchInput } from '../../../components/InputSearch'
import { getEmpresas, Empresa } from '../../../services/companyService'

export const Clients = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)

  //capturar empresa clicada
  const handleEmpresa = (empresa: Empresa) => {
    alert(`Empresa selecionada: ${empresa.nome}`)
    console.log("Nome da empresa selecionada:", empresa.nome)
  }

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const data = await getEmpresas()
        setEmpresas(data)
      } catch (error) {
        console.error('Erro ao carregar empresas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmpresas()
  }, [])

  return (
    <Grid templateColumns="1fr" gap={6} p={3}>
      <GridItem>
        <SearchInput />
      </GridItem>

      <GridItem pb={4} paddingInline={5}>
        {loading ? (
          <Text fontStyle="italic" color="gray.500">
            Carregando empresas...
          </Text>
        ) : empresas.length === 0 ? (
          <Text color="gray.500">Nenhuma empresa encontrada.</Text>
        ) : (
          <List styleType="disc" spacing={3}>
            {empresas.map((empresa) => (
              <ListItem sx={styles.listItem} key={empresa.id} onClick={() => {
                handleEmpresa(empresa);
              }}>
                {empresa.nome}
              </ListItem>
            ))}
          </List>
        )}
      </GridItem>
    </Grid>
  )
}

const styles = {
  listItem: {
    _hover: {
      color: '#68D391',
      cursor: 'pointer',
    },
  },
}
