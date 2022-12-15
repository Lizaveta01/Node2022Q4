export const getPostData = (req: {
  on: (arg0: string, arg1: { (chunk: string): void }) => void;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk: string) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      
      reject(error);
    }
  });
};
