import type { ContractConfig } from '@/types/ContractConfig';
import { defineStore } from 'pinia';
import {
  type EvmMetaDataOptions,
  type EvmNftOptions,
  type DahGalleryOptions,
  blockchains,
} from 'vue-evm-nft';

import { dahDemoV1Abi } from '@/assets/abi/dahDemoV1Abi';
import { dahRev2omAbi } from '@/assets/abi/dahRev2omAbi';

// Name the NFT Contracts used by this site.
export enum ContractName {
  UseEvmNftGallery1 = 'useEvmNftGallery1',
  UseEvmMetaDataGallery1 = 'useEvmMetaDataGallery1',
  UseDahGallery1 = 'useDahGallery1',
}

// Define contract configurations for each Contract Name
const contractConfigs: ContractConfig[] = [
  // Dig-A-Hash Roadmap Contract Details
  {
    contractPublicKey: '0xcbb2a9868d73f24c056893131b97a69ffd36eba9',
    contractAddress: '0x33f1cdD52e7ec6F65Ab93dD518c1e2EdB3a8Dd63',
    abi: dahDemoV1Abi,
    chainId: blockchains.avalanche.chainId,
    holderPublicKey: null,
    rpc: blockchains.avalanche.publicRpc,
    itemsPerPage: 5,
    nftStoreItemCollectionName: ContractName.UseEvmNftGallery1,
    isAscendingSort: false,
  } as EvmNftOptions,

  // Pour House Studios Paintings Contract Details
  {
    contractPublicKey: '0xcbb2a9868d73f24c056893131b97a69ffd36eba9',
    contractAddress: '0xFAdAfa21111f5D75aED908770c61c6322B250843',
    abi: dahRev2omAbi,
    chainId: blockchains.polygon.chainId,
    rpc: blockchains.polygon.publicRpc,
    itemsPerPage: 50,
    nftStoreItemCollectionName: ContractName.UseEvmMetaDataGallery1,
    isAscendingSort: false,
    isGetAllNftQuery: false,
  } as EvmMetaDataOptions,

  // Pour House Studios Paintings Contract Details
  {
    contractPublicKey: '0xcbb2a9868d73f24c056893131b97a69ffd36eba9',
    contractAddress: '0xFAdAfa21111f5D75aED908770c61c6322B250843',
    abi: dahRev2omAbi,
    chainId: blockchains.polygon.chainId,
    rpc: blockchains.polygon.publicRpc,
    itemsPerPage: 50,
    nftStoreItemCollectionName: ContractName.UseDahGallery1,
    isAscendingSort: true,
    isGetAllNftQuery: false,
    startTokenId: 0,
    supply: 25,
  } as DahGalleryOptions,
];

/**
 * This Pinia Store is intended to be customized to create helpers for NFT
 * meta data.
 */
export const useNftHelperStore = defineStore('nftHelperStore', {
  state: () => ({
    contractConfigs,
  }),

  getters: {
    getContractConfigs: (state) => {
      return contractConfigs;
    },
    getContractConfig: () => {
      return <T extends ContractConfig>(
        nftStoreItemCollectionName: string
      ): T => {
        const config = contractConfigs.find(
          (item) =>
            item.nftStoreItemCollectionName === nftStoreItemCollectionName
        );

        if (!config) {
          throw new Error('Contract config not found');
        }

        return config as T;
      };
    },
    getStatusColor: () => {
      return (status: string | null) => {
        switch (status) {
          case 'N/A':
            return 'gray';
          case 'Beta':
            return 'yellow';
          case 'Complete':
            return 'success';
          case 'In Progress':
            return 'warning';
          default:
            return 'gray';
        }
      };
    },
  },
});
