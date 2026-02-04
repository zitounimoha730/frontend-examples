import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
    
export function configAgGrid() {
    ModuleRegistry.registerModules([ AllCommunityModule ]);
}