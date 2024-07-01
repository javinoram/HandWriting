# Hand writing
Software to read handwriting japanese characters (hiragana and katakana)

# Files structures

# Technology Stack
Python's libraries are informed in api/requirements.txt.

For the API I use Flask and for the web inteface I use Nextjs.
## Getting Started
Updating the containers ...


# Data from the neural network
Here you can find the repositories where the data was extracted, all the modified dataset can be shared through an appropriate request.
Any recommendation to improve the accuracy of the NNs is welcome.
### Japanese
Original data from [kmnist](https://github.com/rois-codh/kmnist), images size change to 32x32.

### Korean
Original data from [kaggle](https://www.kaggle.com/datasets/henryshippole/hangul-characters-250k), images size change to 64x64.

### Russian
Original data from [github](https://github.com/GregVial/CoMNIST), images size change to 32x32 and a white background is added to them (originally, the image non have a background).
