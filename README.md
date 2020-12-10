# math
AI Math Solver Frontend
Jennifer Chiang - 012639224
Alyssa Morada - 012391405
Marcos Herrera - 011972818
Enrique Hernandez - 011438973
	
ReadMe: Image Recognition Math Solver

Github:
https://github.com/Inh3ritance/CS-4800-Math-Solver 
- Runs the python ML model, where the data is retrieved and parsed from google drive. The data is parsed and preprocessed for the CNN model and the data is saved to google drive as a .h5 file. We collect the file and host it on google storage.  

https://github.com/77jennifer77/math/
https://github.com/77jennifer77/math/tree/master_clone
-Web app made in React.js, we fetch the url from google cloud storage and feed it into tensorflow.js as the desired model. Canvas made with html5 and processed to scale and size for proper input for the model. The output will display below the canvas when running the predict button. The /master_clone/ branch linked above contains all of our source files that were originally located in the main /math/ branch, which had to be relocated upon hosting the webpage via Github, link below:
https://77jennifer77.github.io/math/


Machine Learning Model Code: https://colab.research.google.com/drive/1zejqqcWPSRn7IXsumwQOxpDwzXIg1KEX?usp=sharing
-Used Google Colab to run our machine learning code, which was developed using most notably Tensorflow and Keras. The simple library importing system Colab provides helped make portability and general development collaboration much more efficient. We hosted the model in google cloud storage found in the link below:

Model (JSON): https://storage.googleapis.com/mathsolvermodel/model.json

Dataset: https://www.kaggle.com/xainano/handwrittenmathsymbols
-Obtained our dataset from Kaggle, which contains over 100 thousand image samples of handwritten math symbols. We ultimately pruned this dataset to only include all digits (0-9) and most basic math operators in order to best optimize the size of our data according to the capacity of our project. We stored the trimmed dataset on Google Drive, found in the link below:

Trimmed Dataset (Google Drive):
https://drive.google.com/drive/folders/1RAtoRG0q91oFShET79fOY7Om89kiMrGB?usp=sharing

Frontend source code:
stored under "source" tag of github repo
https://github.com/77jennifer77/math/tree/source

