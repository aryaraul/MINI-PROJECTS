#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_WORD_LENGTH 100
#define STACK_SIZE 100

// Structure to represent a stack
struct Stack {
    char words[STACK_SIZE][MAX_WORD_LENGTH];
    int top;
};

// Initialize an empty stack
void initialize(struct Stack* stack) {
    stack->top = -1;
}

// Push a word onto the stack
void push(struct Stack* stack, char word[MAX_WORD_LENGTH]) {
    if (stack->top < STACK_SIZE - 1) {
        strcpy(stack->words[++stack->top], word);
    } else {
        printf("Stack is full. Cannot push more words.\n");
        exit(1);
    }
}

// Check if a word is a valid continuation of the previous word
int isValidWord(struct Stack* stack, char word[MAX_WORD_LENGTH]) {
    if (stack->top == -1) {
        return 1;
    }
    char lastChar = stack->words[stack->top][strlen(stack->words[stack->top]) - 1];
    return word[0] == lastChar;
}

int main() {
	int i;
    struct Stack wordStack;
    initialize(&wordStack);

    printf("Word Chain Game (Stack Version)\n");

    while (1) {
        char word[MAX_WORD_LENGTH];
        printf("Enter a word (or 'q' to quit): ");
        scanf("%s", word);

        if (word[0] == 'q') {
            break;
        }

        if (isValidWord(&wordStack, word)) {
            push(&wordStack, word);
        } else {
            printf("Invalid word. It should start with the last letter of the previous word.\n");
            continue;
        }
    }

    printf("Game Over! Here's the word chain:\n");
    for(i = 0; i <= wordStack.top; i++) 
	{
        printf("%s ", wordStack.words[i]);
    }
    printf("\n");

    return 0;
}
