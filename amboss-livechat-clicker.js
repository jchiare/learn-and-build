// AMBOSS Live Chat Auto-Clicker Script
// This script automatically clicks the "Live chat" button in the Zendesk widget

(function() {
  'use strict';

  console.log('[AMBOSS Live Chat] Script started');

  // Configuration
  const CONFIG = {
    maxAttempts: 30,
    attemptInterval: 1000, // 1 second
    clickDelay: 500 // delay before clicking after element is found
  };

  let attemptCount = 0;

  /**
   * Find and click the live chat button
   */
  function clickLiveChatButton() {
    attemptCount++;
    console.log(`[AMBOSS Live Chat] Attempt ${attemptCount}/${CONFIG.maxAttempts}`);

    // Strategy 1: Find by button class with Icon--channelChoice-chat
    let liveChatButton = document.querySelector('button.Icon\\--channelChoice-chat');

    // Strategy 2: Find by data-testid on the span inside
    if (!liveChatButton) {
      const icon = document.querySelector('[data-testid="Icon--channelChoice-chat"]');
      if (icon) {
        liveChatButton = icon.closest('button');
      }
    }

    // Strategy 3: Find button containing "Live chat" text
    if (!liveChatButton) {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        const labelSpan = button.querySelector('[data-testid="label"]');
        if (labelSpan && labelSpan.textContent.trim() === 'Live chat') {
          liveChatButton = button;
          break;
        }
      }
    }

    // Strategy 4: Look within the channel choice container
    if (!liveChatButton) {
      const channelChoice = document.querySelector('[data-embed="channelChoice"]');
      if (channelChoice) {
        const listItems = channelChoice.querySelectorAll('li[data-testid="list-item"]');
        for (const item of listItems) {
          const label = item.querySelector('[data-testid="label"]');
          if (label && label.textContent.trim() === 'Live chat') {
            liveChatButton = item.querySelector('button');
            break;
          }
        }
      }
    }

    if (liveChatButton) {
      console.log('[AMBOSS Live Chat] Live chat button found!', liveChatButton);

      // Check if button is visible and enabled
      const isVisible = liveChatButton.offsetParent !== null;
      const isEnabled = !liveChatButton.disabled && liveChatButton.classList.contains('btnEnabled-1_asg');

      console.log('[AMBOSS Live Chat] Button visibility:', isVisible, 'enabled:', isEnabled);

      if (isVisible) {
        // Wait a bit before clicking to ensure the widget is fully loaded
        setTimeout(() => {
          console.log('[AMBOSS Live Chat] Clicking live chat button...');

          // Try multiple click methods to ensure it works
          try {
            // Method 1: Direct click
            liveChatButton.click();

            // Method 2: MouseEvent click (in case direct click is intercepted)
            const clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
            liveChatButton.dispatchEvent(clickEvent);

            console.log('[AMBOSS Live Chat] ✓ Click executed successfully!');
          } catch (error) {
            console.error('[AMBOSS Live Chat] Error clicking button:', error);
          }
        }, CONFIG.clickDelay);

        return true; // Stop trying
      } else {
        console.log('[AMBOSS Live Chat] Button found but not visible yet, will retry...');
      }
    } else {
      console.log('[AMBOSS Live Chat] Live chat button not found yet, will retry...');
    }

    // Continue trying if we haven't reached max attempts
    if (attemptCount < CONFIG.maxAttempts) {
      setTimeout(clickLiveChatButton, CONFIG.attemptInterval);
    } else {
      console.error('[AMBOSS Live Chat] ✗ Failed to find live chat button after', CONFIG.maxAttempts, 'attempts');
      console.log('[AMBOSS Live Chat] Page structure might have changed. Please check the widget HTML.');
    }

    return false;
  }

  /**
   * Initialize the script
   */
  function init() {
    // Check if we're on the right page
    if (!window.location.href.includes('amboss.com')) {
      console.log('[AMBOSS Live Chat] Not on AMBOSS site, script will not run');
      return;
    }

    console.log('[AMBOSS Live Chat] Initializing on:', window.location.href);

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', clickLiveChatButton);
    } else {
      // DOM is already ready, start immediately
      clickLiveChatButton();
    }

    // Also listen for dynamic changes (in case the widget loads later)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          // Check if the widget was added
          const widgetAdded = Array.from(mutation.addedNodes).some(node => {
            return node.nodeType === 1 && (
              node.matches && node.matches('[data-embed="channelChoice"]') ||
              node.querySelector && node.querySelector('[data-embed="channelChoice"]')
            );
          });

          if (widgetAdded) {
            console.log('[AMBOSS Live Chat] Zendesk widget detected, attempting to click...');
            observer.disconnect(); // Stop observing once we found it
            setTimeout(clickLiveChatButton, 500);
            break;
          }
        }
      }
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('[AMBOSS Live Chat] Observer attached, watching for widget...');
  }

  // Start the script
  init();
})();
