export interface IfscProvider {
  fetchIfscDetails(ifsc: string): Promise<any>;
}
