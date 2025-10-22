import { gql } from '@apollo/client';

export const GET_ALL_PROPERTIES = gql`
  query GetAllProperties(
    $query: String
    $minPrice: Decimal
    $maxPrice: Decimal
    $page: Int
    $pageSize: Int
  ) {
    properties(
      query: $query
      minPrice: $minPrice
      maxPrice: $maxPrice
      page: $page
      pageSize: $pageSize
    ) {
      items {
        idProperty
        name
        address
        price
        codeInternal
        year
        idOwner
        firstImage
      }
      totalCount
      page
      pageSize
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_PROPERTY_BY_ID = gql`
  query GetPropertyById($id: String!) {
    property(id: $id) {
      idProperty
      name
      address
      price
      codeInternal
      year
      idOwner
      firstImage
      images
      traces {
        idPropertyTrace
        dateSale
        name
        value
        tax
      }
      owner {
        idOwner
        name
        photo
      }
    }
  }
`;

